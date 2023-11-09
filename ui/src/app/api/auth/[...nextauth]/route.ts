import NextAuth, { NextAuthOptions } from 'next-auth';
import CryptoJS from 'crypto-js';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/db/db';
import { eq } from 'drizzle-orm';
import { users } from '@/db/schema/schema';

const authOptions: NextAuthOptions = {
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
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        } else {
          try {
            const [user] = await db
              .select()
              .from(users)
              .where(eq(users.email, credentials.email.toLowerCase()));
            if (!user) {
              // new NextResponse(
              //   JSON.stringify({
              //     emailError: 'This email address is not registered'
              //   }),
              //   {
              //     status: 401
              //   }
              // );
              return null;
            }
            const { passwordHash, ...rest } = user;
            const unhashedPassword = CryptoJS.AES.decrypt(
              passwordHash!,
              process.env.PASSWORD_SECRET!
            ).toString(CryptoJS.enc.Utf8);
            if (credentials.password !== unhashedPassword) {
              // new NextResponse(
              //   JSON.stringify({ passwordError: 'This password is incorrect' }),
              //   {
              //     status: 401
              //   }
              // );

              return null;
            } else {
              return user;
            }
          } catch (err) {
            console.error(err);
            // new NextResponse(JSON.stringify(err), {
            //   status: 500
            // });
            return null;
          }
        }
      }
    })
  ],
  secret: 'process.env.NEXTAUTH_SECRET',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  // debug: process.env.NODE_ENV === 'development',
  debug: true,
  pages: {
    signIn: '/auth/login',
    error: '/auth/login'
  },
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user?.id;
      }
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: { ...session.user, id: token.sub }
      // session.user.id = token.id;
      // return session;
    })
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
