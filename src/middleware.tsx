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
    secret: process.env.NEXT_SECRET! // Changed from NEXT_SECRET to NEXTAUTH_SECRET
  });
  

  const { pathname } = request.nextUrl;

  // 1. Redirect authenticated users away from auth pages to dashboard


  // 2. Protect admin routes
  if (pathname.startsWith('/dashboard') && !token) {
    if (!token) {
      const signInUrl = new URL('/#pricing', request.url);
      // Add callbackUrl to redirect back after login
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }
    
   
  }

  return NextResponse.next();
}