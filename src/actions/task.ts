"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { Priority } from "@/generated/client";

export const getTasks = async (userId?: string) => {
	if (!userId) {
		return [];
	}

	try {
		const tasks = await prisma.task.findMany({
			where: {
				userId,
				deleted: false,
			},
		});

		return tasks;
	} catch (error) {
		console.error("Erreur lors de la récupération des tâches:", error);
		return [];
	}
};

export const addTask = async (formData: FormData) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/login");
	}

	const title = formData.get("title") as string;
	const description = formData.get("description") as string;
	const dueDate = formData.get("dueDate") as string;
	const priority = (formData.get("priority") as Priority) || "MEDIUM";

	if (!title?.trim()) {
		throw new Error("Le titre de la tâche est requis");
	}

	if (title.trim().length > 255) {
		throw new Error("Le titre ne peut pas dépasser 255 caractères");
	}

	try {
		const task = await prisma.task.create({
			data: {
				title: title.trim(),
				description: description?.trim() || null,
				userId: session.user.id,
				dueDate: dueDate ? new Date(dueDate) : null,
				priority,
			},
		});

		revalidatePath("/");
		return { success: true, message: "Tâche ajoutée avec succès !", task };
	} catch (error) {
		console.error("Erreur lors de l'ajout de la tâche:", error);
		throw new Error("Une erreur est survenue lors de l'ajout de la tâche");
	}
};

export const deleteTask = async (id: string) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/login");
	}

	try {
		// Suppression douce
		await prisma.task.update({
			where: { id },
			data: {
				deleted: true,
				deletedAt: new Date(),
			},
		});

		revalidatePath("/");
		return { success: true, message: "Tâche supprimée avec succès !" };
	} catch (error) {
		console.error("Erreur lors de la suppression:", error);
		throw new Error("Une erreur est survenue lors de la suppression");
	}
};

export const hardDeleteTask = async (id: string) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		redirect("/login");
	}
	try {
		await prisma.task.delete({
			where: { id },
		});
		revalidatePath("/");
		return { success: true, message: "Tâche définitivement supprimée !" };
	} catch (error) {
		console.error("Erreur lors de la suppression définitive:", error);
		throw new Error(
			"Une erreur est survenue lors de la suppression définitive",
		);
	}
};

export const restoreTask = async (id: string) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/login");
	}

	try {
		await prisma.task.update({
			where: { id },
			data: {
				deleted: false,
				deletedAt: null,
			},
		});

		revalidatePath("/");
		return { success: true, message: "Tâche restaurée avec succès !" };
	} catch (error) {
		console.error("Erreur lors de la restauration:", error);
		throw new Error("Une erreur est survenue lors de la restauration");
	}
};

export const toggleTask = async (id: string) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/login");
	}

	try {
		const task = await prisma.task.findUnique({
			where: { id },
			select: { completed: true },
		});

		if (!task) {
			throw new Error("Tâche non trouvée");
		}

		await prisma.task.update({
			where: { id },
			data: {
				completed: !task.completed,
			},
		});

		revalidatePath("/");
		return { success: true };
	} catch (error) {
		console.error("Erreur lors de la mise à jour:", error);
		throw new Error("Une erreur est survenue lors de la mise à jour");
	}
};

export const editTask = async (formData: FormData) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/login");
	}

	const id = formData.get("id") as string;
	const title = formData.get("title") as string;
	const description = formData.get("description") as string;
	const dueDate = formData.get("dueDate") as string;
	const priority = (formData.get("priority") as Priority) || "MEDIUM";

	if (!title?.trim()) {
		throw new Error("Le titre de la tâche est requis");
	}

	if (title.trim().length > 255) {
		throw new Error("Le titre ne peut pas dépasser 255 caractères");
	}

	try {
		const task = await prisma.task.update({
			where: { id },
			data: {
				title: title.trim(),
				description: description?.trim() || null,
				dueDate: dueDate ? new Date(dueDate) : null,
				priority,
			},
		});

		revalidatePath("/");
		return { success: true, message: "Tâche modifiée avec succès !", task };
	} catch (error) {
		console.error("Erreur lors de la modification:", error);
		throw new Error("Une erreur est survenue lors de la modification");
	}
};
