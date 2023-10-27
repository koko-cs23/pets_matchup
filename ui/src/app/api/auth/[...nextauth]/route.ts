import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/db/db';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { users } from '@/db/schema/schema';

const handler = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // const user = {
        //   id: 1,
        //   email: 'johndoe@example.com',
        //   firstName: 'John',
        //   lastName: 'Ezeiru'
        // };
        // return user;
        if (!credentials?.email || !credentials.password) {
          new NextResponse(
            JSON.stringify({ message: 'All Fields are required' }),
            {
              status: 301
            }
          );
        } else {
          try {
            const [user] = await db
              .select()
              .from(users)
              .where(eq(users.email, credentials.email.toLowerCase()));
            if (!user) {
              new NextResponse(
                JSON.stringify({
                  emailError: 'This email address is not registered'
                }),
                {
                  status: 401
                }
              );
            }
            const { passwordHash, ...rest } = user;
            const unhashedPassword = CryptoJS.AES.decrypt(
              passwordHash,
              process.env.PASSWORD_SECRET!
            ).toString(CryptoJS.enc.Utf8);
            if (credentials.password !== unhashedPassword) {
              new NextResponse(
                JSON.stringify({ passwordError: 'This password is incorrect' }),
                {
                  status: 401
                }
              );
            } else {
              return user;
            }
          } catch (err) {
            console.error(err);
            new NextResponse(JSON.stringify(err), {
              status: 500
            });
          }
        }
      }
    })
  ],
  secret: process.env.SECRET,
  session: { strategy: 'jwt' },
  debug: process.env.NODE_ENV === 'development'
});

export { handler as GET, handler as POST };
