import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins"
import { db } from "../db/drizzle";
import { schema } from "@/db/schema";
import { sendResetPasswordEMail, sendVerificationEMail } from "./mail";

export const auth = betterAuth({
    appName: "todolist",
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            ...schema,
            user: schema.user,
        }
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async ({ user, url }) => {
            await sendResetPasswordEMail(user.email as string, url);
        }
    },
    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            redirectURI: `${process.env.BETTER_AUTH_URL}/api/auth/callback/google`
        },
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        expiresIn: 3600,
        sendVerificationEmail: async ({ user, token }) => {
            const verificationUrl = `${process.env.BETTER_AUTH_URL}/email-verified?token=${token}`;
            await sendVerificationEMail(user.email as string, verificationUrl);
        },
    },
    plugins: [
        nextCookies(),
        openAPI()
    ]
})

export type Session = typeof auth.$Infer.Session;

export const { signInEmail, signOut, signUpEmail, signInSocial, getSession } = auth.api