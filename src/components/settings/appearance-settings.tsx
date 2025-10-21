"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";

export default function AppearanceSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Thème</CardTitle>
          <CardDescription>
            Personnalisez l'apparence de l'application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Mode d'affichage</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("light")}
                className="justify-start"
              >
                <Sun className="mr-2 h-4 w-4" />
                Clair
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("dark")}
                className="justify-start"
              >
                <Moon className="mr-2 h-4 w-4" />
                Sombre
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("system")}
                className="justify-start"
              >
                <Monitor className="mr-2 h-4 w-4" />
                Système
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interface</CardTitle>
          <CardDescription>
            Configurez les éléments d'interface
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="animations">Animations</Label>
              <p className="text-sm text-muted-foreground">
                Activer les animations et transitions
              </p>
            </div>
            <Switch id="animations" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sound">Sons</Label>
              <p className="text-sm text-muted-foreground">
                Jouer des sons pour les actions importantes
              </p>
            </div>
            <Switch id="sound" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="language">Langue</Label>
            <Select defaultValue="fr">
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une langue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Accessibilité</CardTitle>
          <CardDescription>
            Options pour améliorer l'accessibilité
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="high-contrast">Contraste élevé</Label>
              <p className="text-sm text-muted-foreground">
                Augmenter le contraste pour une meilleure lisibilité
              </p>
            </div>
            <Switch id="high-contrast" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="reduce-motion">Réduire les mouvements</Label>
              <p className="text-sm text-muted-foreground">
                Minimiser les animations pour réduire les distractions
              </p>
            </div>
            <Switch id="reduce-motion" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="font-size">Taille de police</Label>
            <Select defaultValue="normal">
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner la taille" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Petite</SelectItem>
                <SelectItem value="normal">Normale</SelectItem>
                <SelectItem value="large">Grande</SelectItem>
                <SelectItem value="extra-large">Très grande</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}