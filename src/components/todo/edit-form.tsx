"use client";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import type { Task } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { fr } from "date-fns/locale";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import { editTask, toggleTask } from "@/actions/task";

export default function EditTaskForm({
	isOpen,
	onOpenChange,
	task,
}: {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	task: Task;
}) {
	const [editedTask, setEditedTask] = useState<Task>(task);
	const handleUpdate = async (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("id", task.id);
		formData.append("title", editedTask.title);
		formData.append("description", editedTask.description || "");
		formData.append(
			"dueDate",
			editedTask.dueDate ? new Date(editedTask.dueDate).toISOString() : ""
		);

		try {
			const result = await editTask(formData);
			if (result.success) {
				toast.success(result.message);
				onOpenChange(false);
			}
		} catch (error) {
			toast.error(
				error instanceof Error
					? error.message
					: "Une erreur est survenue"
			);
		}
	};
	return (
		<Sheet open={isOpen} onOpenChange={onOpenChange}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Modifier la tâche</SheetTitle>
					<SheetDescription className="text-muted-foreground">
						Ajustez les détails de votre tâche ici.
					</SheetDescription>
					<form className="space-y-4 mt-4" onSubmit={handleUpdate}>
						<div className="space-y-2">
							<label
								htmlFor="title"
								className="text-sm font-medium"
							>
								Titre
							</label>
							<Input
								id="title"
								type="text"
								value={editedTask.title}
								onChange={(e) =>
									setEditedTask({
										...editedTask,
										title: e.target.value,
									})
								}
								placeholder="Titre de la tâche"
							/>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="description"
								className="text-sm font-medium"
							>
								Description
							</label>
							<Textarea
								id="description"
								onChange={(e) =>
									setEditedTask({
										...editedTask,
										description: e.target.value,
									})
								}
								value={editedTask.description || ""}
								className="min-h-[100px]"
								placeholder="Description de la tâche"
							/>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="dueDate"
								className="text-sm font-medium"
							>
								Date d'échéance
							</label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className={cn(
											"w-full justify-start text-left font-normal",
											!task.dueDate &&
												"text-muted-foreground"
										)}
									>
										<CalendarIcon className="mr-2 h-4 w-4" />
										{editedTask.dueDate
											? format(
													new Date(
														editedTask.dueDate
													),
													"PPPP",
													{
														locale: fr,
													}
												)
											: "Choisir une date"}
									</Button>
								</PopoverTrigger>
								<PopoverContent
									className="w-auto overflow-hidden p-0"
									align="start"
								>
									<Calendar
										mode="single"
										selected={
											task.dueDate
												? new Date(task.dueDate)
												: undefined
										}
										onSelect={(date) => {
											setEditedTask({
												...editedTask,
												dueDate: date || task.dueDate,
											});
										}}
										disabled={(date) => date < new Date()}
										captionLayout="dropdown"
										locale={fr}
									/>
								</PopoverContent>
							</Popover>
						</div>

						<div className="flex items-center space-x-2">
							<Checkbox
								id="completed"
								defaultChecked={task.completed}
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
											}
										);
									});
								}}
							/>
							<label
								htmlFor="completed"
								className="text-sm font-medium"
							>
								Tâche terminée
							</label>
						</div>

						<div className="flex gap-2 pt-4">
							<Button type="submit" className="flex-1">
								Enregistrer
							</Button>
							<Button
								type="button"
								variant="outline"
								onClick={() => onOpenChange(false)}
								className="flex-1"
							>
								Annuler
							</Button>
						</div>
					</form>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}
