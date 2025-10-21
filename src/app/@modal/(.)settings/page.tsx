"use client";

import { useRouter } from "next/navigation";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskSettings from "@/components/settings/task-settings";
import AccountSettings from "@/components/settings/account-settings";
import AppearanceSettings from "@/components/settings/appearance-settings";

export default function SettingsModal() {
	const router = useRouter();
	const [open, setOpen] = useState(true);

	return (
		<Dialog
			open={open}
			onOpenChange={(isOpen: boolean) => {
				setOpen(isOpen);
				if (!isOpen) {
					router.back();
				}
			}}
		>
			<DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Paramètres</DialogTitle>
					<DialogDescription>
						Modifiez vos préférences et configurez votre application.
					</DialogDescription>
				</DialogHeader>
				<div>
					<Tabs defaultValue="tasks" className="w-full">
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger value="tasks">Tâches</TabsTrigger>
							<TabsTrigger value="account">Compte</TabsTrigger>
							<TabsTrigger value="appearance">Apparence</TabsTrigger>
						</TabsList>
						<TabsContent value="tasks" className="mt-6">
							<TaskSettings />
						</TabsContent>
						<TabsContent value="account" className="mt-6">
							<AccountSettings />
						</TabsContent>
						<TabsContent value="appearance" className="mt-6">
							<AppearanceSettings />
						</TabsContent>
					</Tabs>
				</div>
			</DialogContent>
		</Dialog>
	);
}
