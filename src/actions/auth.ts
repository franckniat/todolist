"use server";

import { signIn, signUp } from "@/lib/auth-client";
import type { LoginSchema, RegisterSchema } from "@/schemas";
import { redirect } from "next/navigation";

export const signInGoogle = async () => {
    const { data } = await signIn.social({
        provider: "google",
    });
    if(data?.url && data.redirect) {
        redirect(data.url);
    }
}


export const signInEmail = async (data:LoginSchema) => {
    const { data: session } = await signIn.email({
        email: data.email,
        password: data.password,
    });
    return session
}

export const signUpEmail = async (data:RegisterSchema) => {
    const { data: session, error } = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
    });
    return { session, error }
}