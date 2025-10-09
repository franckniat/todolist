"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export default function TodoListSkeleton() {
	return (
		<div className="space-y-4">
			{/* Skeleton pour les tâches actives */}
			<div className="flex flex-col gap-2">
				{Array.from({ length: 3 }).map((_, index) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: non ideal but acceptable here since it's static
						key={index}
						className="flex items-center space-x-3 p-3 rounded-lg border bg-card"
					>
						{/* Checkbox skeleton */}
						<Skeleton className="h-4 w-4 rounded" />

						{/* Contenu de la tâche */}
						<div className="flex-1 space-y-1">
							<Skeleton className="h-4 w-3/4" />
							<Skeleton className="h-3 w-1/2" />
						</div>

						{/* Boutons d'action */}
						<div className="flex space-x-1">
							<Skeleton className="h-8 w-8 rounded" />
							<Skeleton className="h-8 w-8 rounded" />
						</div>
					</div>
				))}
			</div>

			{/* Skeleton pour l'accordéon des tâches terminées */}
			<Accordion type="single" collapsible className="w-full">
				<AccordionItem value="completed">
					<AccordionTrigger className="text-sm text-muted-foreground hover:no-underline">
						<Skeleton className="h-4 w-32" />
					</AccordionTrigger>
					<AccordionContent>
						<div className="flex flex-col gap-2 pt-2">
							{Array.from({ length: 2 }).map((_, index) => (
								<div
									// biome-ignore lint/suspicious/noArrayIndexKey: non ideal but acceptable here since it's static
									key={index}
									className="flex items-center space-x-3 p-3 rounded-lg border bg-card opacity-60"
								>
									<Skeleton className="h-4 w-4 rounded" />
									<div className="flex-1 space-y-1">
										<Skeleton className="h-4 w-2/3" />
										<Skeleton className="h-3 w-1/3" />
									</div>
									<div className="flex space-x-1">
										<Skeleton className="h-8 w-8 rounded" />
										<Skeleton className="h-8 w-8 rounded" />
									</div>
								</div>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
