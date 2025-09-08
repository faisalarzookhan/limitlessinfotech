import NextAuth from 'next-auth';
import authConfig from './lib/auth.config';
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
} from '@/routes';
import { createRateLimitMiddleware, rateLimitConfigs } from './lib/rate-limit';
import { NextResponse } from 'next/server';
import { withSecurityHeaders } from './lib/security';

const { auth } = NextAuth(authConfig);
const rateLimitMiddleware = createRateLimitMiddleware(rateLimitConfigs.auth);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const user = req.auth?.user;

    if (nextUrl.pathname.startsWith('/api/auth/callback')) {
        const isAllowed = rateLimitMiddleware(req);
        if (!isAllowed) {
            return withSecurityHeaders(NextResponse.json({ error: 'Too many requests' }, { status: 429 }));
        }
    }

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return withSecurityHeaders(NextResponse.next());
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            const response = Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
            return withSecurityHeaders(response as NextResponse);
        }
        return withSecurityHeaders(NextResponse.next());
    }

    if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl);

        const response = Response.redirect(new URL(
            `/auth/login?callbackUrl=${encodedCallbackUrl}`,
            nextUrl
        ));
        return withSecurityHeaders(response as NextResponse);
    }

    if (isLoggedIn) {
        if (nextUrl.pathname.startsWith('/admin') && user?.role !== 'admin') {
            const response = Response.redirect(new URL('/unauthorized', nextUrl));
            return withSecurityHeaders(response as NextResponse);
        }
        if (nextUrl.pathname.startsWith('/cpanel') && user?.role !== 'admin') {
            const response = Response.redirect(new URL('/unauthorized', nextUrl));
            return withSecurityHeaders(response as NextResponse);
        }
    }

    const response = NextResponse.next();
    return withSecurityHeaders(response);
});

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
