"use client";

import { CalendarIcon, Plus } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import type { Task } from "@/types";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "../ui/input-group";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function TodoForm() {
	const [newTask, setNewTask] = useState<Task>();
	const { data: session } = useSession();
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!session) {
			toast.error("Vous devez être connecté pour ajouter une tâche.");
			return;
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			<div className="w-full flex items-center gap-1 px-2">
				<InputGroup>
					<InputGroupInput
						placeholder="Ajouter une tâche..."
						className="flex-1"
						autoFocus
						value={newTask?.title || ""}
						onChange={(e) =>
							setNewTask({
								...newTask,
								title: e.target.value,
								completed: false,
								createdAt: new Date(),
							} as Task)
						}
						required
					/>
					<InputGroupAddon align="inline-end">
						{newTask?.title && (
							<Popover>
								<PopoverTrigger asChild>
									<InputGroupButton variant={"outline"}>
										<CalendarIcon />
									</InputGroupButton>
								</PopoverTrigger>
								<PopoverContent
									className="w-auto overflow-hidden p-0"
									align="start"
								>
									<Calendar
										mode="single"
										selected={
											newTask?.dueDate || undefined
										}
										captionLayout="dropdown"
										onSelect={(date) => {
											setNewTask({
												...newTask,
												dueDate: date,
											} as Task);
										}}
									/>
								</PopoverContent>
							</Popover>
						)}
						<InputGroupButton variant={"default"} type="submit">
							<Plus />
							<span>Ajouter</span>
						</InputGroupButton>
					</InputGroupAddon>
				</InputGroup>
			</div>
		</form>
	);
}
