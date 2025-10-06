"use client";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import type { Task } from "@/types";

export default function EditForm({
	buttonTitle,
	isOpen,
	onOpenChange,
}: {
	buttonTitle: string;
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	task: Task;
}) {
	return (
		<Sheet open={isOpen} onOpenChange={onOpenChange}>
			<SheetTrigger>{buttonTitle}</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Modifier la tâche</SheetTitle>
					<SheetDescription className="text-muted-foreground">
						Ajustez les détails de votre tâche ici.
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}
