"use server";

import { eq, not, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { task } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getTasks = async (userId?: string) => {
    if (!userId) {
        return [];
    }
    
    try {
        const data = await db
            .select()
            .from(task)
            .where(eq(task.userId, userId))
            .orderBy(desc(task.createdAt));
        
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des tâches:", error);
        return [];
    }
};

export const addTask = async (formData: FormData) => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/login");
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const dueDate = formData.get("dueDate") as string;

    // Validation
    if (!title?.trim()) {
        throw new Error("Le titre de la tâche est requis");
    }

    if (title.trim().length > 255) {
        throw new Error("Le titre ne peut pas dépasser 255 caractères");
    }

    try {
        const [newTask] = await db.insert(task).values({
            title: title.trim(),
            description: description?.trim() || null,
            userId: session.user.id,
            completed: false,
            dueDate: dueDate ? new Date(dueDate) : null,
        }).returning();

        revalidatePath("/");
        return { success: true, message: "Tâche ajoutée avec succès !", task: newTask };
    } catch (error) {
        console.error("Erreur lors de l'ajout de la tâche:", error);
        throw new Error("Une erreur est survenue lors de l'ajout de la tâche");
    }
};

export const deleteTask = async (id: string) => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/login");
    }

    if (!id) {
        throw new Error("ID de la tâche requis");
    }

    try {
        const deletedTask = await db
            .delete(task)
            .where(eq(task.id, id))
            .returning();
        
        if (deletedTask.length === 0) {
            throw new Error("Tâche non trouvée");
        }
        
        revalidatePath("/");
        return { success: true, message: "Tâche supprimée avec succès !" };
    } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        throw new Error("Une erreur est survenue lors de la suppression");
    }
};

export const toggleTask = async (id: string) => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/login");
    }

    if (!id) {
        throw new Error("ID de la tâche requis");
    }

    try {
        const [updatedTask] = await db
            .update(task)
            .set({
                completed: not(task.completed),
                updatedAt: new Date(),
            })
            .where(eq(task.id, id))
            .returning();
        
        if (!updatedTask) {
            throw new Error("Tâche non trouvée");
        }
        
        revalidatePath("/");
        return { success: true, task: updatedTask };
    } catch (error) {
        console.error("Erreur lors de la mise à jour:", error);
        throw new Error("Une erreur est survenue lors de la mise à jour");
    }
};

export const editTask = async (formData: FormData) => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/login");
    }

    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const dueDate = formData.get("dueDate") as string;

    // Validation
    if (!id) {
        throw new Error("ID de la tâche requis");
    }

    if (!title?.trim()) {
        throw new Error("Le titre de la tâche est requis");
    }

    if (title.trim().length > 255) {
        throw new Error("Le titre ne peut pas dépasser 255 caractères");
    }

    try {
        const [updatedTask] = await db
            .update(task)
            .set({
                title: title.trim(),
                description: description?.trim() || null,
                dueDate: dueDate ? new Date(dueDate) : null,
                updatedAt: new Date(),
            })
            .where(eq(task.id, id))
            .returning();
        
        if (!updatedTask) {
            throw new Error("Tâche non trouvée");
        }
        
        revalidatePath("/");
        return { success: true, message: "Tâche modifiée avec succès !", task: updatedTask };
    } catch (error) {
        console.error("Erreur lors de la modification:", error);
        throw new Error("Une erreur est survenue lors de la modification");
    }
};