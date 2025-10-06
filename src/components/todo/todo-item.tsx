"use client";

import type { Task } from "@/types";
import { Checkbox } from "../ui/checkbox";
import { useLocalStorage } from "usehooks-ts";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip, PenLine, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "../ui/button";

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
			<div className="flex-1 flex items-center justify-between gap-3">
				<div className="flex items-center gap-3">
					<Checkbox
						className="w-5 h-5 cursor-pointer"
						checked={task.completed}
						onCheckedChange={(checked) => {
							const updatedTasks = storedTasks.map((t) =>
								t.id === task.id
									? { ...t, completed: checked as boolean }
									: t
							);
							setStoredTasks(updatedTasks);
						}}
					/>
					<span
						className={cn(
							"text-sm font-medium",
							task.completed
								? "line-through transition-all duration-150"
								: ""
						)}
					>
						{task.title}
					</span>
				</div>
				<div className="flex items-center gap-3 ">
					{task.dueDate && (
						<span className="text-xs text-muted-foreground group-hover:hidden">
							A faire avant le{" "}
							{format(task.dueDate, "dd/MM/yyyy")}
						</span>
					)}
					<div className="flex items-center gap-1 group-hover:opacity-100 opacity-0 transition-opacity">
						<Button variant={"outline"} size={"icon-sm"}>
							<PenLine />
						</Button>
						<Button variant={"destructive"} size={"icon-sm"} onClick={() => {
							const updatedTasks = storedTasks.filter((t) => t.id !== task.id);
							setStoredTasks(updatedTasks);
						}}>
							<Trash size={16} />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
