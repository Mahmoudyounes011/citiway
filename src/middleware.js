import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

// Route groups protected by server-side authentication.
const PROTECTED_PREFIXES = ['/admin', '/dashboard'];
const LOGIN_PATH = '/admin/login';

// Only accept an internal, single-slash path as a post-login target.
// Prevents open-redirect (`//evil.com`, `https://…`) and redirect loops.
function safeRedirectTarget(raw) {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return null;
  const isProtected = PROTECTED_PREFIXES.some(
    (p) => raw === p || raw.startsWith(p + '/'),
  );
  if (!isProtected || raw.startsWith(LOGIN_PATH)) return null;
  return raw;
}

// Copy any refreshed auth cookies onto a redirect response so a token
// rotation performed during getUser() is not lost when we redirect.
function withCookies(source, target) {
  source.cookies.getAll().forEach((cookie) => target.cookies.set(cookie));
  return target;
}

export async function middleware(request) {
  const { pathname, search } = request.nextUrl;

  // Mutable response; setAll() rebuilds it when Supabase rotates cookies.
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // getUser() revalidates the JWT against the Supabase Auth server on every
  // request (unlike getSession(), which trusts unverified cookie contents).
  // A tampered cookie / invalid JWT / expired-and-unrefreshable token all
  // resolve to `user = null`, and any transport error is swallowed so we
  // fail CLOSED (treat as unauthenticated) rather than leaking access.
  let user = null;
  try {
    const { data, error } = await supabase.auth.getUser();
    if (!error) user = data.user ?? null;
  } catch {
    user = null;
  }

  const isProtected = PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + '/'),
  );
  const isLoginPage = pathname === LOGIN_PATH;

  // 1) Unauthenticated hit on a protected route → bounce to login,
  //    remembering where they were headed. Login page is exempt (no loop).
  if (isProtected && !isLoginPage && !user) {
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.search = '';
    url.searchParams.set('redirectTo', pathname + (search || ''));
    return withCookies(response, NextResponse.redirect(url));
  }

  // 2) Already-authenticated user landing on the login page → send them
  //    to their intended destination (or the dashboard). No loop: target
  //    is always a non-login protected route and the user is present.
  if (isLoginPage && user) {
    const target = safeRedirectTarget(
      request.nextUrl.searchParams.get('redirectTo'),
    );
    const url = request.nextUrl.clone();
    url.pathname = target || '/admin';
    url.search = '';
    return withCookies(response, NextResponse.redirect(url));
  }

  // 3) Otherwise proceed, carrying any rotated cookies forward.
  return response;
}

export const config = {
  // Bare paths AND their subtrees. `/admin/:path*` alone does not match `/admin`.
  matcher: ['/admin', '/admin/:path*', '/dashboard', '/dashboard/:path*'],
};
