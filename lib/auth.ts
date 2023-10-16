import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/lib/models/user";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"

export const config = {
  debug: true,
    providers: [
        CredentialsProvider({
          name: "credentials",
          credentials: {
          },
          async authorize(credentials) {
            // @ts-ignore
            const { username, password } = credentials;
            try {
              await connectMongoDB();
              const user = await User.findOne({username});
              if (!user) {
                return null;
              }
    
              const passwordsMatch = await bcrypt.compare(password, user.password);
    
              if (!passwordsMatch) {
                return null;
              }
              return user;
            } catch (error) {
              console.log("Error: ", error);
            }
          },
        }),
      ],
      session: {
        strategy: "jwt",
      },
      secret: process.env.NEXTAUTH_SECRET,
      pages: {
        signIn: "/login",
      },
      callbacks: {
        async session({ session, token }) {
          // @ts-ignore
          session.user = token.user;
          return session;
        },
        async jwt({ token, user }) {
          if (user) {
            token.user = user;
          }
          return token;
        },
      },
} satisfies NextAuthOptions

export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
  return getServerSession(...args, config)
}