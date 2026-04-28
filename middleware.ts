import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  if (request.nextUrl.pathname.startsWith('/sitemap')) {
    response.headers.set('Vary', 'Accept-Encoding');
  }
  
  return response;
}

export const config = {
  matcher: ['/sitemap/:path*', '/sitemap-index.xml'],
};
