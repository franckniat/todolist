"use client";

import React from 'react';
import type { Task } from "@/types";
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
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export default function TodoList({ tasks = [] }: { tasks: Task[] }) {
	const [localTasks, setLocalTasks] = React.useState<Task[]>(tasks);

	React.useEffect(() => {
		setLocalTasks(tasks);
	}, [tasks]);

	const activeTasks = localTasks.filter((task) => !task.completed);
	const completedTasks = localTasks.filter((task) => task.completed);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	async function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (!over || active.id === over.id) return;

		// We only reorder within the active tasks list
		const activeIds = activeTasks.map((t) => t.id);
		const oldIndex = activeIds.indexOf(active.id as string);
		const newIndex = activeIds.indexOf(over.id as string);

		if (oldIndex === -1 || newIndex === -1) return;

		const reorderedActive = arrayMove(activeTasks, oldIndex, newIndex);

		// Merge back with completed tasks (keep completed tasks after active ones)
		const newLocal = [...reorderedActive, ...completedTasks];

		// Optimistically update UI
		setLocalTasks(newLocal);

		// Persist order: send ordered ids for all tasks
		try {
			const orderedIds = newLocal.map((t) => t.id);
			await fetch('/api/tasks/reorder', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ orderedIds }),
			});
		} catch (err) {
			console.error('Failed to persist order', err);
			// Option: refetch or revert UI on error. For now, leave optimistic state.
		}
	}

	return (
		<div className="space-y-4">
					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
					>
				{activeTasks.length > 0 && (
					<SortableContext
						items={activeTasks.map((task) => task.id)}
						strategy={verticalListSortingStrategy}
					>
						<div className="flex flex-col gap-2">
							{activeTasks.map((task) => (
								<TodoItem key={task.id} task={task} />
							))}
						</div>
					</SortableContext>
				)}

				{completedTasks.length > 0 && (
					<Accordion type="single" collapsible className="w-full">
						<AccordionItem value="completed">
							<AccordionTrigger className="text-sm text-muted-foreground hover:no-underline">
								Tâches terminées ({completedTasks.length})
							</AccordionTrigger>
							<AccordionContent>
								<SortableContext
									items={completedTasks.map(
										(task) => task.id,
									)}
									strategy={verticalListSortingStrategy}
								>
									<div className="flex flex-col gap-2 pt-2">
										{completedTasks.map((task) => (
											<TodoItem
												key={task.id}
												task={task}
											/>
										))}
									</div>
								</SortableContext>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				)}
			</DndContext>

			{/* Message si aucune tâche */}
			{tasks.length === 0 && (
				<p className="text-sm text-muted-foreground text-center">
					Aucune tâche pour le moment. Ajoutez une tâche pour
					commencer !
				</p>
			)}
		</div>
	);
}
