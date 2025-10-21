import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskSettings from "@/components/settings/task-settings";
import AccountSettings from "@/components/settings/account-settings";
import AppearanceSettings from "@/components/settings/appearance-settings";

export default function SettingsPage() {
  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-6">Paramètres</h1>
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
    </div>
  );
}