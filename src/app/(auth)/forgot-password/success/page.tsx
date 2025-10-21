"use client";

import { Check } from "lucide-react";

export default function ForgotPasswordSuccess() {

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-3">
                <Check size={26} />
                <h1 className="text-2xl font-bold">Vérifier votre email</h1>
            </div>
            <p className="text-muted-foreground">
                Nous vous avons envoyé un lien pour réinitialiser votre mot de passe.
            </p>
        </div>
    );
}
