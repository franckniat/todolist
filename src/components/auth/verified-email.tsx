"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { betterFetch } from "@better-fetch/fetch";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import type { Session } from "@/lib/auth";
import { toast } from "sonner";
import { Check } from "lucide-react";

export default function VerificationForm() {
	const params = useSearchParams();
	const token = params.get("token");

	useEffect(() => {
		const fetchToken = async () => {
			if (token) {
				const res = await betterFetch<{
					status: boolean;
					user: Session;
				}>(`/api/auth/verify-email?token=${token}`);
				if (res.data?.status === true) {
					toast.success("Votre email a été vérifié avec succès !", {
						description: "Vous pouvez maintenant vous connecter.",
					});
				}
			}
		};
		fetchToken();
	}, [token]);

	return (
		<div className="space-y-3">
			<Check size={30}/>
			<h1 className="text-2xl font-bold">Confirmation d'email</h1>
			<p className="text-muted-foreground">
				Votre email a été vérifié avec succès !
			</p>
			<Link href="/login" className={buttonVariants({ variant: "default" })}>
				Se connecter
			</Link>
		</div>
	);
}
