"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import type { Task } from "@/types";
import { useLocalStorage } from "usehooks-ts";

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
				<Input
					placeholder="Ajouter une tâche ..."
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
				<Button className="gap-2">
					<Plus />
					<span>Ajouter</span>
				</Button>
			</div>
		</form>
	);
}
