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

export default function TodoList() {
	const [storedTasks, setStoredTasks] = useLocalStorage<Task[]>("tasks", []);

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
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={storedTasks.map((task) => task.id)}
					strategy={verticalListSortingStrategy}
				>
					<div className="flex flex-col gap-2">
						{storedTasks.map((task) => (
							<TodoItem key={task.id} task={task} />
						))}
					</div>
				</SortableContext>
			</DndContext>
		</div>
	);
}