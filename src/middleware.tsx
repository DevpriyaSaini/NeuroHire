import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/',
  ],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXT_SECRET! 
  });
  

  const { pathname } = request.nextUrl;


  if (pathname.startsWith('/dashboard') && !token) {
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL(token ? '/dashboard' : '/sign-in', request.url));
  }

  return NextResponse.next();
}