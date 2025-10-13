"use client";

import { CalendarIcon, Plus, X } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useRef, useState, useTransition } from "react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "../ui/input-group";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { addTask } from "@/actions/task";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

export default function TodoForm() {
	const { data: session } = useSession();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [dueDate, setDueDate] = useState<Date>();
	const [showDescription, setShowDescription] = useState(false);
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);

	const resetForm = () => {
		setTitle("");
		setDescription("");
		setDueDate(undefined);
		setShowDescription(false);
		setIsCalendarOpen(false);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!session) {
			toast.error("Vous devez être connecté pour ajouter une tâche.");
			router.push("/login");
			return;
		}

		if (!title.trim()) {
			toast.error("Le titre de la tâche est requis.");
			return;
		}

		const formData = new FormData();
		formData.append("title", title.trim());
		formData.append("description", description.trim());
		if (dueDate) {
			formData.append("dueDate", dueDate.toISOString());
		}

		startTransition(async () => {
			try {
				const result = await addTask(formData);
				if (result.success) {
					toast.success(result.message);
					resetForm();
					inputRef.current?.focus();
				}
			} catch (error) {
				toast.error(
					error instanceof Error
						? error.message
						: "Une erreur est survenue",
				);
			}
		});
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
			e.preventDefault();
			handleSubmit(e);
		}
	};

	return (
		<div className="space-y-3">
			<form onSubmit={handleSubmit} className="space-y-3">
				<div className="w-full flex items-center gap-1 px-2">
					<InputGroup>
						<InputGroupInput
							ref={inputRef}
							placeholder="Ajouter une tâche... (Ctrl+Enter pour valider)"
							className="flex-1"
							autoFocus
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							onKeyDown={handleKeyDown}
							disabled={isPending}
							required
							maxLength={255}
						/>
						<InputGroupAddon align="inline-end">
							{title.trim() && (
								<>
									{/* Bouton Description */}
									<InputGroupButton
										type="button"
										variant="outline"
										onClick={() =>
											setShowDescription(!showDescription)
										}
										className={cn(
											showDescription && "bg-muted",
										)}
										disabled={isPending}
									>
										<span className="text-xs">Desc</span>
									</InputGroupButton>

									{/* Bouton Calendrier */}
									<Popover
										open={isCalendarOpen}
										onOpenChange={setIsCalendarOpen}
									>
										<PopoverTrigger asChild>
											<InputGroupButton
												type="button"
												variant="outline"
												className={cn(
													dueDate && "bg-muted",
												)}
												disabled={isPending}
											>
												<CalendarIcon className="h-4 w-4" />
											</InputGroupButton>
										</PopoverTrigger>
										<PopoverContent
											className="w-auto overflow-hidden p-0"
											align="start"
										>
											<Calendar
												mode="single"
												selected={dueDate}
												onSelect={(date) => {
													setDueDate(date);
													setIsCalendarOpen(false);
												}}
												disabled={(date) =>
													date < new Date()
												}
												captionLayout="dropdown"
												locale={fr}
											/>
										</PopoverContent>
									</Popover>
								</>
							)}

							{/* Bouton Ajouter */}
							<InputGroupButton
								variant="default"
								type="submit"
								disabled={!title.trim() || isPending}
							>
								<Plus className="h-4 w-4" />
								<span>
									{isPending ? "Ajout..." : "Ajouter"}
								</span>
							</InputGroupButton>
						</InputGroupAddon>
					</InputGroup>
				</div>

				{/* Zone description étendue */}
				{showDescription && (
					<div className="px-2">
						<Textarea
							placeholder="Description de la tâche (optionnel)..."
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							onKeyDown={handleKeyDown}
							disabled={isPending}
							rows={3}
							className="resize-none"
							maxLength={1000}
						/>
					</div>
				)}

				{/* Affichage de la date sélectionnée */}
				{dueDate && (
					<div className="px-2 flex items-center justify-between">
						<span className="text-sm text-muted-foreground">
							📅 Échéance :{" "}
							{format(dueDate, "PPPP", { locale: fr })}
						</span>
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={() => setDueDate(undefined)}
							disabled={isPending}
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
				)}
			</form>

			{/* Raccourcis clavier */}
			{title.trim() && !isPending && (
				<div className="px-2">
					<p className="text-xs text-muted-foreground">
						💡{" "}
						<kbd className="px-1 py-0.5 bg-muted rounded text-xs">
							Ctrl
						</kbd>{" "}
						+{" "}
						<kbd className="px-1 py-0.5 bg-muted rounded text-xs">
							Enter
						</kbd>{" "}
						pour ajouter rapidement
					</p>
				</div>
			)}

			{/* Indicateur de caractères */}
			{title.length > 200 && (
				<div className="px-2">
					<p className="text-xs text-muted-foreground">
						{title.length}/255 caractères
					</p>
				</div>
			)}
		</div>
	);
}
