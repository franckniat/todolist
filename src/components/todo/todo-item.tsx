"use client";

import type { Task } from "@/types";
import { Checkbox } from "../ui/checkbox";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip, PenLine, Trash, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { deleteTask, editTask, restoreTask, toggleTask } from "@/actions/task";
import { toast } from "sonner";
import { useState, useRef, useEffect } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog";
import EditTaskForm from "./edit-form";

export default function TodoItem({ task }: { task: Task }) {
	const [isEditing, setIsEditing] = useState(false);
	const [editTitle, setEditTitle] = useState(task.title);
	const [isLoading, setIsLoading] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: task.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	// Focus sur l'input quand on entre en mode édition
	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus();
			inputRef.current.select();
		}
	}, [isEditing]);

	const handleStartEdit = () => {
		setIsEditing(true);
		setEditTitle(task.title);
	};

	const handleCancelEdit = () => {
		setIsEditing(false);
		setEditTitle(task.title);
	};

	const handleSaveEdit = async () => {
		if (!editTitle.trim()) {
			toast.error("Le titre ne peut pas être vide");
			return;
		}

		if (editTitle.trim() === task.title) {
			setIsEditing(false);
			return;
		}

		setIsLoading(true);
		try {
			const formData = new FormData();
			formData.append("id", task.id);
			formData.append("title", editTitle.trim());
			formData.append("description", task.description || "");
			if (task.dueDate) {
				formData.append("dueDate", task.dueDate.toISOString());
			}

			await editTask(formData);
			setIsEditing(false);
			toast.success("Tâche modifiée avec succès");
		} catch (error) {
			console.error("Erreur lors de la modification:", error);
			toast.error("Erreur lors de la modification");
		} finally {
			setIsLoading(false);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleSaveEdit();
		} else if (e.key === "Escape") {
			e.preventDefault();
			handleCancelEdit();
		}
	};

	const [isOpen, setIsOpen] = useState(false);

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="flex items-center gap-3 px-1.5 py-1 hover:bg-foreground/5 rounded-md cursor-pointer bg-background group"
		>
			<div
				{...attributes}
				{...listeners}
				className="cursor-grab active:cursor-grabbing touch-none opacity-0 group-hover:opacity-100 transition-opacity"
			>
				<Grip className="w-4 h-4 text-muted-foreground" />
			</div>
			<div className="flex-1 flex items-center justify-between gap-3">
				<div className="flex items-center gap-3 flex-1">
					<Checkbox
						className="w-5 h-5 cursor-pointer"
						checked={task.completed}
						id={`task-${task.id}`}
						disabled={isEditing}
						onCheckedChange={() => {
							toggleTask(task.id).then(() => {
								toast.success(
									task.completed
										? "Tâche marquée comme non terminée"
										: "Tâche terminée",
									{
										description: task.completed
											? "La tâche a été marquée comme non terminée."
											: "La tâche a été marquée comme terminée.",
									},
								);
							});
						}}
					/>

					{isEditing ? (
						<div className="flex items-center gap-2 flex-1">
							<Input
								ref={inputRef}
								value={editTitle}
								onChange={(e) => setEditTitle(e.target.value)}
								onKeyDown={handleKeyDown}
								onBlur={handleSaveEdit}
								disabled={isLoading}
								className="h-8 text-sm"
								maxLength={255}
							/>
							<div className="flex items-center gap-1">
								<Button
									size="sm"
									variant="ghost"
									onClick={handleSaveEdit}
									disabled={isLoading}
									className="h-6 w-6 p-0"
								>
									<Check className="h-3 w-3" />
								</Button>
								<Button
									size="sm"
									variant="ghost"
									onClick={handleCancelEdit}
									disabled={isLoading}
									className="h-6 w-6 p-0"
								>
									<X className="h-3 w-3" />
								</Button>
							</div>
						</div>
					) : (
						<button
							type="button"
							className={cn(
								"text-sm font-medium cursor-text px-1 py-0.5 rounded transition-colors flex-1 text-left",
								task.completed
									? "line-through transition-all duration-150"
									: "",
							)}
							onClick={handleStartEdit}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									handleStartEdit();
								}
							}}
							title="Cliquer pour modifier"
						>
							{task.title}
						</button>
					)}
				</div>
				<div className="flex items-center gap-3">
					{task.dueDate && !isEditing && (
						<span className="text-xs text-muted-foreground group-hover:hidden">
							A faire avant le{" "}
							{format(task.dueDate, "dd/MM/yyyy")}
						</span>
					)}
					<div
						className={cn(
							"flex items-center gap-1 transition-opacity",
							isEditing
								? "opacity-0 pointer-events-none"
								: "group-hover:opacity-100 opacity-0",
						)}
					>
						<EditTaskForm
							isOpen={isOpen}
							onOpenChange={setIsOpen}
							task={task}
						/>
						<Button
							variant={"outline"}
							size={"icon-sm"}
							onClick={() => setIsOpen(true)}
						>
							<PenLine />
						</Button>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									variant={"destructive"}
									size={"icon-sm"}
								>
									<Trash size={16} />
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										Êtes-vous sûr de vouloir supprimer cette
										tâche ?
									</AlertDialogTitle>
									<AlertDialogDescription>
										Cette action est irréversible.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>
										Annuler
									</AlertDialogCancel>
									<AlertDialogAction
										onClick={() => {
											deleteTask(task.id).then(() => {
												toast.success(
													"Tâche supprimée",
													{
														description:
															"La tâche a été supprimée avec succès.",
														action: {
															label: "Annuler",
															onClick: () => {
																restoreTask(
																	task.id,
																);
															},
														},
													},
												);
											});
										}}
									>
										Supprimer
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				</div>
			</div>
		</div>
	);
}
