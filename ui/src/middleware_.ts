export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/login',
    '/register',
    '/dashboard',
    '/dashboard/:path*',
    '/admin',
    '/admin/:path*',
    '/api/admin/:path*',
    '/api/auth/logout',
    '/api/admin'
  ]
};
