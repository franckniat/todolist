"use client";

import type { Task } from "@/types";
import { Checkbox } from "../ui/checkbox";
import { useLocalStorage } from "usehooks-ts";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TodoItem({ task }: { task: Task }) {
	const [storedTasks, setStoredTasks] = useLocalStorage<Task[]>("tasks", []);

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
			<Checkbox
				className="w-5 h-5 cursor-pointer"
				checked={task.completed}
				onCheckedChange={(checked) => {
					const updatedTasks = storedTasks.map((t) =>
						t.id === task.id ? { ...t, completed: checked as boolean } : t,
					);
					setStoredTasks(updatedTasks);
				}}
			/>
			<span className={cn("text-sm font-medium",task.completed ? "line-through transition-all duration-150" : "")}>
				{task.title}
			</span>
		</div>
	);
}
