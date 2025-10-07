"use client";

import type { Task } from "@/types";
import TodoItem from "./todo-item";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	//type DragEndEvent,
} from "@dnd-kit/core";
import {
	//arrayMove,
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

	const activeTasks = tasks.filter((task) => !task.completed);
	const completedTasks = tasks.filter((task) => task.completed);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	/* function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			const oldIndex = tasks.findIndex((task) => task.id === active.id);
			const newIndex = tasks.findIndex((task) => task.id === over.id);

			const reorderedTasks = arrayMove(tasks, oldIndex, newIndex);
		}
	} */

	return (
		<div className="space-y-4">
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				//onDragEnd={handleDragEnd}
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
										(task) => task.id
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
