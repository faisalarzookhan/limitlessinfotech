import { NextResponse } from 'next/server';

/**
 * A higher-order function to add common security headers to a Next.js response.
 * This helps protect against common web vulnerabilities like XSS, clickjacking, etc.
 * @param response - The original NextResponse object.
 * @returns The NextResponse object with added security headers.
 * @example
 * // In a middleware file
 * import { withSecurityHeaders } from '@/lib/security';
 * import { NextResponse } from 'next/server';
 *
 * export function middleware(request) {
 *   const response = NextResponse.next();
 *   return withSecurityHeaders(response);
 * }
 */
export function withSecurityHeaders(response: NextResponse) {
  // Content Security Policy (CSP): Mitigates XSS attacks.
  response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src * 'self' data:;");
  // Prevents MIME-sniffing the content type.
  response.headers.set('X-Content-Type-Options', 'nosniff');
  // Protects against clickjacking attacks.
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  // Enables the XSS filter in browsers.
  response.headers.set('X-XSS-Protection', '1; mode=block');
  // Enforces secure (HTTPS) connections to the server.
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  return response;
}
