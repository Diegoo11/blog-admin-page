/* eslint-disable no-param-reassign */
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const configAuth = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { username, password } = credentials;
        const { USER, PASSWORD } = process.env;
        if (username === USER && password === PASSWORD) {
          return { name: 'Admin' };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.user = user;
      return token;
    },
    session: async ({ token, session }) => {
      const { user } = token;
      session.user = user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(configAuth);

export { handler as GET, handler as POST };
