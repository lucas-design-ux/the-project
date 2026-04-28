import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('[Middleware] Path:', request.nextUrl.pathname);
  const response = NextResponse.next();
  
  if (request.nextUrl.pathname.startsWith('/sitemap')) {
    response.headers.set('Vary', 'Accept-Encoding');
    console.log('[Middleware] Vary header set');
  }
  
  return response;
}

export const config = {
  matcher: ['/sitemap/:path*', '/sitemap-index.xml'],
};
