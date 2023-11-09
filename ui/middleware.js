import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export default async function middleware(req) {
  const path = req.nextUrl.pathname;

  if (path === '/') {
    return NextResponse.next();
  }

  const auth_cookie =
    req.cookies.get('next-auth.session-token') ||
    req.cookies.get('__Secure-next-auth.session-token');

  // if (
  //   !req.cookies.has('next-auth.session-token') &&
  //   req.cookies.has('__Secure-next-auth.session-token')
  // ) {
  //   req.cookies.set({
  //     ...req.cookies.get('__Secure-next-auth.session-token'),
  //     name: 'next-auth.session-token'
  //   });
  // }

  const session = auth_cookie;

  const isProtected = path.includes('/dashboard') || path === '/pet/new-pet';

  if (!session && isProtected) {
    return NextResponse.redirect(
      new URL(
        `/auth/login?alert=You are not logged in&callbackUrl=${path}`,
        req.url
      )
    );
  } else if (session && (path === '/auth/login' || path === '/auth/register')) {
    return NextResponse.redirect(
      new URL('/?alert=You are already logged in', req.url)
    );
  }
  return NextResponse.next();
}

// export { default } from 'next-auth/middleware';

// export const config = {
//   matcher: [
//     // '/login',
//     // '/register',
//     '/dashboard',
//     '/dashboard/:path*',
//     // '/dashboard/*',
//     // '/admin',
//     // '/admin/:path*',
//     // '/api/admin/:path*',
//     // '/api/auth/logout',
//     '/api/admin',
//     '/pet/new-pet'
//   ]
// };
