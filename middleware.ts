import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle CORS for extension API routes
  if (pathname.startsWith('/api/extention')) {
    const origin = request.headers.get('origin') || '';

    // Check if origin is from a browser extension
    const isExtensionOrigin =
      origin.startsWith('chrome-extension://') ||
      origin.startsWith('moz-extension://') ||
      origin.startsWith('safari-web-extension://');

    // Handle preflight OPTIONS request
    if (request.method === 'OPTIONS') {
      const response = new NextResponse(null, { status: 200 });

      if (isExtensionOrigin) {
        response.headers.set('Access-Control-Allow-Origin', origin);
      }

      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
      response.headers.set('Access-Control-Allow-Credentials', 'true');
      response.headers.set('Access-Control-Max-Age', '86400');

      return response;
    }

    // Handle actual request - add CORS headers and continue
    const response = NextResponse.next();

    if (isExtensionOrigin) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Credentials', 'true');
    }

    return response;
  }

  // Handle authentication for protected routes
  if (pathname === "/dashboard" || pathname.startsWith("/editor/")) {
    const sessionCookie = getSessionCookie(request);
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/signup", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/editor/:id*",
    "/api/extention/:path*"  // Add extension API routes to matcher
  ],
};
