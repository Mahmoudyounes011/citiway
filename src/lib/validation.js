// ─────────────────────────────────────────────────────────────
// Shared, framework-agnostic validation + sanitization for public
// forms. Pure functions only (no I/O) so they are trivially testable
// and run identically on the server route and in unit tests.
// ─────────────────────────────────────────────────────────────

export const LIMITS = {
  name: 120,
  email: 254, // RFC 5321 max
  phone: 32,
  subject: 120,
  message: 4000,
  maxBytes: 8 * 1024, // 8 KB request-body ceiling
};

// Conservative, ReDoS-safe patterns (no catastrophic backtracking).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9()\-.\s]{7,20}$/;

// Honeypot field names: real users never fill these (they are hidden).
export const HONEYPOT_FIELDS = ['company', 'website', 'hp'];

// Remove ASCII/C1 control characters (code point < 32, or DEL 127) without
// relying on regex escapes. Keeps normal printable + unicode text.
function stripControlChars(str) {
  let out = '';
  for (const ch of str) {
    const code = ch.codePointAt(0);
    if (code >= 32 && code !== 127) out += ch;
  }
  return out;
}

// Strip control chars, HTML tags and stray angle brackets, collapse
// whitespace, trim. Neutralizes stored-XSS and normalizes junk. This is
// defense-in-depth: values are also parameterized at the DB layer.
export function sanitizeText(value) {
  if (typeof value !== 'string') return '';
  return stripControlChars(value)
    .replace(/<[^>]*>/g, '') // HTML tags
    .replace(/[<>]/g, '')    // stray angle brackets
    .replace(/\s{2,}/g, ' ') // collapse whitespace runs
    .trim();
}

export function isValidEmail(email) {
  return (
    typeof email === 'string' &&
    email.length <= LIMITS.email &&
    EMAIL_RE.test(email)
  );
}

export function isValidPhone(phone) {
  return typeof phone === 'string' && PHONE_RE.test(phone.trim());
}

// True if any honeypot field is filled → treat request as a bot.
export function isBot(body) {
  if (!body || typeof body !== 'object') return false;
  return HONEYPOT_FIELDS.some(
    (f) => typeof body[f] === 'string' && body[f].trim() !== '',
  );
}

// Per-form field requirements.
const SCHEMAS = {
  contact: { requireName: true, requirePhone: true, requireMessage: true },
  'property-inquiry': { requireName: true, requirePhone: true, requireMessage: false },
  'offplan-inquiry': { requireName: true, requirePhone: true, requireMessage: false },
  'floorplan-unlock': { requireName: true, requirePhone: true, requireMessage: false },
  newsletter: { requireName: false, requirePhone: false, requireMessage: false },
};

export const FORM_TYPES = Object.keys(SCHEMAS);

// Validate + sanitize a submission. Returns:
//   { ok:true,  clean }          → safe row for `leads`
//   { ok:false, status, errors } → reject with HTTP status
//   { ok:false, bot:true }       → honeypot tripped (drop silently)
export function validateLead(body) {
  if (!body || typeof body !== 'object') {
    return { ok: false, status: 400, errors: ['malformed body'] };
  }

  if (isBot(body)) {
    return { ok: false, bot: true, status: 200, errors: ['honeypot'] };
  }

  const type = typeof body.formType === 'string' ? body.formType : '';
  const schema = SCHEMAS[type];
  if (!schema) {
    return { ok: false, status: 422, errors: ['invalid or missing formType'] };
  }

  const errors = [];
  const name = sanitizeText(body.name);
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const phone = sanitizeText(body.phone);
  const subject = sanitizeText(body.subject);
  const message = sanitizeText(body.message);

  // Email is required for every form type.
  if (!isValidEmail(email)) errors.push('invalid email');

  if (schema.requireName && name.length < 2) errors.push('name too short');
  if (name.length > LIMITS.name) errors.push('name too long');

  if (schema.requirePhone) {
    if (!isValidPhone(phone)) errors.push('invalid phone');
  } else if (phone && !isValidPhone(phone)) {
    errors.push('invalid phone');
  }
  if (phone.length > LIMITS.phone) errors.push('phone too long');

  if (schema.requireMessage && message.length < 2) errors.push('message required');
  if (message.length > LIMITS.message) errors.push('message too long');
  if (subject.length > LIMITS.subject) errors.push('subject too long');

  if (errors.length) return { ok: false, status: 422, errors };

  // status is FORCED to 'new' (RLS also enforces this); name is synthesized
  // for newsletter because leads.name is NOT NULL.
  const clean = {
    name: name || (type === 'newsletter' ? 'Newsletter Subscriber' : 'Website Lead'),
    email,
    phone: phone || null,
    message:
      [subject ? `[${subject}]` : '', message].filter(Boolean).join('\n\n') || null,
    property_slug:
      typeof body.propertySlug === 'string'
        ? sanitizeText(body.propertySlug).slice(0, 200) || null
        : null,
    source: type,
    status: 'new',
  };

  return { ok: true, clean };
}

// Stable fingerprint for duplicate-spam detection (ip + email + message).
export function fingerprint(ip, clean) {
  const basis = `${ip}|${(clean.email || '').toLowerCase()}|${clean.message || ''}`;
  let h = 5381;
  for (let i = 0; i < basis.length; i++) h = ((h << 5) + h + basis.charCodeAt(i)) | 0;
  return String(h >>> 0);
}
