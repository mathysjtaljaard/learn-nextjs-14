// import Auth from "@auth/core"
// import Okta from "@auth/core/providers/okta"

// const {OKTA_CLIENT_ID, OKTA_CLIENT_SECRET, OKTA_ISSUER} = process.env

// export const { auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   providers: [Okta({ clientId: OKTA_CLIENT_ID, clientSecret: OKTA_CLIENT_SECRET, issuer: OKTA_ISSUER })],
// });

import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import type { User } from "@/app/lib/definitions";
import bcrypt from "bcrypt";
import { init } from "./middleware";
import { userService } from "./app/lib/services/user.service";

async function getUser(email: string): Promise<User | undefined> {
  
  try {
    await init();
    return await userService.getUserByEmail(email);
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
