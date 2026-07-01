import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { validateLead, fingerprint, LIMITS } from '../../../lib/validation';

// Node runtime: we need the raw body + a process-lifetime in-memory store.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ── In-memory limiter/dedup ──────────────────────────────────────────
// NOTE: process-local. Fine for a single instance / self-hosted Node.
// For multi-instance serverless, back these with Redis/Upstash — the
// interface (hit/isDuplicate) stays the same.
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5; // submissions per IP per window
const MIN_INTERVAL_MS = 2000; // reject bursts faster than this
const DEDUP_TTL_MS = 30 * 60 * 1000; // ignore identical repeats for 30 min

const ipHits = new Map(); // ip -> number[] (timestamps)
const seen = new Map(); // fingerprint -> timestamp

function clientIp(req) {
  const xff = req.headers.get('x-forwarded-for') || '';
  return xff.split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';
}

function rateLimit(ip, now) {
  const hits = (ipHits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (hits.length && now - hits[hits.length - 1] < MIN_INTERVAL_MS) {
    return { ok: false, retryAfter: 2 };
  }
  if (hits.length >= MAX_PER_WINDOW) {
    const retryAfter = Math.ceil((WINDOW_MS - (now - hits[0])) / 1000);
    return { ok: false, retryAfter };
  }
  hits.push(now);
  ipHits.set(ip, hits);
  return { ok: true };
}

function isDuplicate(fp, now) {
  const prev = seen.get(fp);
  if (prev && now - prev < DEDUP_TTL_MS) return true;
  seen.set(fp, now);
  return false;
}

// Opportunistic cleanup so the maps don't grow unbounded.
function sweep(now) {
  if (seen.size > 5000) {
    for (const [k, t] of seen) if (now - t > DEDUP_TTL_MS) seen.delete(k);
  }
  if (ipHits.size > 5000) {
    for (const [k, arr] of ipHits) {
      if (!arr.some((t) => now - t < WINDOW_MS)) ipHits.delete(k);
    }
  }
}

function json(status, body, headers) {
  return NextResponse.json(body, { status, headers });
}

export async function POST(req) {
  const now = Date.now();
  const ip = clientIp(req);
  sweep(now);

  // 1) Reject malformed requests: wrong content type.
  const ctype = req.headers.get('content-type') || '';
  if (!ctype.includes('application/json')) {
    return json(415, { error: 'Unsupported Media Type' });
  }

  // 2) Reject large payloads (declared and actual).
  const declared = Number(req.headers.get('content-length') || 0);
  if (declared && declared > LIMITS.maxBytes) {
    return json(413, { error: 'Payload Too Large' });
  }
  const raw = await req.text();
  if (raw.length > LIMITS.maxBytes) {
    return json(413, { error: 'Payload Too Large' });
  }

  // 3) Reject malformed JSON.
  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { error: 'Malformed JSON' });
  }

  // 4) Rate limit per IP (before doing any real work).
  const rl = rateLimit(ip, now);
  if (!rl.ok) {
    return json(429, { error: 'Too Many Requests' }, { 'Retry-After': String(rl.retryAfter) });
  }

  // 5) Validate + honeypot + sanitize.
  const result = validateLead(body);
  if (result.bot) {
    // Honeypot tripped: pretend success so bots don't learn they're caught.
    return json(200, { ok: true });
  }
  if (!result.ok) {
    return json(result.status || 422, { error: 'Validation failed', details: result.errors });
  }

  // 6) Duplicate-spam suppression.
  if (isDuplicate(fingerprint(ip, result.clean), now)) {
    return json(429, { error: 'Duplicate submission' });
  }

  // 7) Persist via server-side client. RLS still restricts this to a
  //    'new' lead insert; we never expose service_role here.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return json(500, { error: 'Server not configured' });
  }
  try {
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const { error } = await supabase.from('leads').insert([result.clean]);
    if (error) return json(502, { error: 'Could not store submission' });
  } catch {
    return json(502, { error: 'Could not store submission' });
  }

  return json(201, { ok: true });
}

// Any other method is a malformed request for this endpoint.
export async function GET() {
  return json(405, { error: 'Method Not Allowed' });
}
