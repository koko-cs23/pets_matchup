import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    })
    // CredentialsProvider({
    //   id: 'credentials',
    //   name: 'Credentials',
    //   async authorize(credentials) {}
    // })
  ]
});

export { handler as GET, handler as POST };
