import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from 'bcryptjs';

export const authOptions: NextAuthOptions = {
   session: {
      strategy: "jwt",
   },
   providers: [
      CredentialsProvider({
         name: "Sign in",
         credentials: {
            email: {
               label: "Email",
               type: "email",
               placeholder: "example@example.com",
            },
            password: {
               label: "Password",
               type: "password"
            },
         },
         async authorize(credentials: any) {
            const { email, password } = credentials as any
            const user = await fetch('http://localhost:3000/api/auth/login',
               {
                  method: 'POST',
                  headers: {
                     'Content-type': 'application/json',
                  },
                  body: JSON.stringify(
                     {
                        email,
                        password
                     }
                  ),
               }
            ).then(res => res.json());
            if (!user || user?.ERROR) {
               return null;
            }
            return user;
         }
      }),
   ],
   callbacks: {
      session: ({ session, token }) => {
         // console.log("Session Callback", { session, token });
         const u = token.user as unknown as any;
         return {
            ...session,
            user: {
               ...session.user,
               ...u
            },
         };
      },
      jwt: ({ token, user }) => {
         // console.log("JWT Callback", { token, user });
         if (user) {
            const u = user as unknown as any;
            return {
               ...token,
               user: u
            };
         }
         return token;
      },
   },
};