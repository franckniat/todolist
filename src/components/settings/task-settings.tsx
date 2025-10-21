"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function TaskSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Comportement des tâches</CardTitle>
          <CardDescription>
            Configurez comment vos tâches se comportent
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-complete">Complétion automatique</Label>
              <p className="text-sm text-muted-foreground">
                Marquer automatiquement les tâches comme terminées après une certaine durée
              </p>
            </div>
            <Switch id="auto-complete" />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Recevoir des rappels pour les tâches importantes
              </p>
            </div>
            <Switch id="notifications" />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="archive-completed">Archivage automatique</Label>
              <p className="text-sm text-muted-foreground">
                Archiver automatiquement les tâches terminées après 7 jours
              </p>
            </div>
            <Switch id="archive-completed" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Actions de maintenance</CardTitle>
          <CardDescription>
            Gérez vos données de tâches
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full">
            Exporter toutes les tâches
          </Button>
          <Button variant="destructive" className="w-full">
            Supprimer toutes les tâches terminées
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}