"use server";

import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string) => {
    return await db.select().from(user).where(eq(user.email, email)).limit(1).then(res => res[0]);
}

export const getAllUsers = async () => {
    return await db.select().from(user);
}

export const getUserById = async (id: string) => {
    return await db.select().from(user).where(eq(user.id, id));
}