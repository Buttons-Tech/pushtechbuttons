import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('dunamis_session')?.value;
  const isProtectedPath = request.nextUrl.pathname.startsWith('/dunamis/dashboard') || 
                          request.nextUrl.pathname.startsWith('/dunamis/wallet');

  if (isProtectedPath && !session) {
    return NextResponse.redirect(new URL('/dunamis/onboarding', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dunamis/dashboard/:path*', '/dunamis/wallet/:path*'],
};