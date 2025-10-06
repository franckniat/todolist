"use client";

import type { Task } from "@/types";
import { useLocalStorage } from "usehooks-ts";
import TodoItem from "./todo-item";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	type DragEndEvent,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { ArrowDownAZ, Calendar } from "lucide-react";
import { Badge } from "../ui/badge";

type SortType = "date" | "alphabetical";

export default function TodoList() {
	const [storedTasks, setStoredTasks] = useLocalStorage<Task[]>("tasks", []);
	const [sortType, setSortType] = useState<SortType>("date");

	// Fonction de tri selon le type sélectionné
	const getSortedTasks = () => {
		const tasks = [...storedTasks];

		// Séparer les tâches complétées et non complétées
		const incompleteTasks = tasks.filter((task) => !task.completed);
		const completedTasks = tasks.filter((task) => task.completed);

		// Fonction de tri
		const sortFn = (a: Task, b: Task) => {
			if (sortType === "alphabetical") {
				return a.title.localeCompare(b.title);
			}
			// Par défaut : par date (plus récent en premier)
			return (
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			);
		};

		// Trier séparément les deux groupes
		incompleteTasks.sort(sortFn);
		completedTasks.sort(sortFn);

		// Retourner non complétées en premier, puis complétées
		return [...incompleteTasks, ...completedTasks];
	};

	const sortedTasks = getSortedTasks();

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			const oldIndex = storedTasks.findIndex((task) => task.id === active.id);
			const newIndex = storedTasks.findIndex((task) => task.id === over.id);

			const reorderedTasks = arrayMove(storedTasks, oldIndex, newIndex);
			setStoredTasks(reorderedTasks);
		}
	}

	return (
		<div className="space-y-4">
			<div className="flex gap-2 justify-end">
				<Badge
					variant={sortType === "date" ? "default" : "outline"}
					onClick={() => setSortType("date")}
					className="gap-2 cursor-pointer"
				>
					<Calendar className="w-4 h-4" />
					Par date
				</Badge>
				<Badge
					variant={sortType === "alphabetical" ? "default" : "outline"}
					onClick={() => setSortType("alphabetical")}
					className="gap-2 cursor-pointer"
				>
					<ArrowDownAZ className="w-4 h-4" />
					Alphabétique
				</Badge>
			</div>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={sortedTasks.map((task) => task.id)}
					strategy={verticalListSortingStrategy}
				>
					<div className="flex flex-col gap-2">
						{sortedTasks.map((task) => (
							<TodoItem key={task.id} task={task} />
						))}
					</div>
				</SortableContext>
			</DndContext>
		</div>
	);
}