import { LOGIN, REFRESH_TOKEN } from "@/graphql/mutations/auth";
import { graphqlRequestHandler } from "@/lib/graphql-server";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
  const response = await graphqlRequestHandler(
    REFRESH_TOKEN,
    {},
    {
      authorization: `Refresh ${token.authTokens.refreshToken}`,
    }
  );

  return {
    ...token,
    authTokens: response.refreshToken,
  };
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;

        const response = await graphqlRequestHandler(LOGIN, {
          input: {
            email,
            password,
          },
        });

        if (response.login.user) {
          return {
            user: response.login.user,
            authTokens: response.login.authTokens,
          } as any;
        } else {
          return {
            error: null,
            status: 400,
            ok: false,
            url: null,
          };
        }
      },
    }),
  ],

  callbacks: {
    async jwt(value) {
      const { token, user } = value;
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.authTokens?.expiresIn) return token;

      return await refreshToken(token);
    },

    async session(value) {
      const { token, session } = value;
      session.user = token.user;
      session.authTokens = token.authTokens;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
