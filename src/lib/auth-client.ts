import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react

export const authClient = createAuthClient({
	// Next.js n'expose les variables env au client que si elles commencent par NEXT_PUBLIC_.
	baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? process.env.BETTER_AUTH_URL,
});

export const { signIn, signOut, signUp, useSession, getSession } = authClient;
