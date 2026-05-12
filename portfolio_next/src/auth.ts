import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const adminEmail = process.env.ADMIN_EMAIL;
        const passwordHash = process.env.ADMIN_PASSWORD_HASH;
        const plainPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || parsed.data.email.trim() !== adminEmail.trim()) {
          return null;
        }

        let ok = false;
        if (passwordHash?.length) {
          ok = await bcrypt.compare(parsed.data.password, passwordHash);
        } else if (plainPassword?.length) {
          ok = parsed.data.password === plainPassword;
        }

        if (!ok) return null;

        return { id: adminEmail, name: adminEmail, email: adminEmail };
      },
    }),
  ],
  pages: {
    signIn: "/dashboard/login",
  },
});
