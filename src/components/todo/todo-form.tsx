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
import { useLocalStorage } from "usehooks-ts";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "../ui/input-group";

export default function TodoForm() {
	const [newTask, setNewTask] = useState<Task>();
	const [storedTasks, setStoredTasks] = useLocalStorage<Task[]>("tasks", []);
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (newTask) {
			setStoredTasks([...storedTasks, newTask]);
		}
		setNewTask(undefined);
		console.log(newTask);
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
								id: crypto.randomUUID(),
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
