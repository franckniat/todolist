"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchema } from "@/schemas";
import {
	Form,
	FormMessage,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export function RegisterForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [isPending, startTransition] = useTransition();
	const registerform = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: RegisterSchema) => {
		startTransition(async () => {
			await authClient.signUp.email(
				{
					name: data.name,
					email: data.email,
					password: data.password,
				},
				{
					onRequest: () => {
						toast.info("Patientez un instant ...");
					},
					onSuccess: async () => {
						toast.success("Compte créé ", {
							description:
								"Votre compte a été créé. Vérifiez votre e-mail pour vérifier votre compte.",
						});
						redirect("/login");
					},
					onError: (ctx) => {
						if (ctx.error.status === 400) {
							toast.error("Erreur de validation", {
								description:
									"Vérifiez les informations saisies.",
							});
						} else if (ctx.error.status === 409) {
							toast.error("Compte existant", {
								description:
									"Un compte avec cet e-mail existe déjà.",
							});
						} else if (ctx.error.status === 429) {
							toast.error("Trop de tentatives", {
								description: "Veuillez réessayer plus tard.",
							});
						} else {
							toast.error("Erreur lors de la création", {
								description:
									ctx.error.message ||
									"Une erreur s'est produite. Veuillez réessayer.",
							});
						}
					},
				},
			);
		});
	};

	return (
		<div className={cn("flex flex-col gap-4", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Créez votre compte</CardTitle>
					<CardDescription>
						Entrez votre e-mail ci-dessous pour créer un compte
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...registerform}>
						<form onSubmit={registerform.handleSubmit(onSubmit)}>
							<FieldGroup className="gap-4">
								<Field>
									<FormField
										control={registerform.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Nom & Prénom
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														disabled={isPending}
														id="name"
														type="text"
														placeholder="Entrez votre nom complet"
														required
													/>
												</FormControl>
												<FormMessage>
													{
														registerform.formState
															.errors.name
															?.message
													}
												</FormMessage>
											</FormItem>
										)}
									/>
								</Field>
								<Field>
									<FormField
										control={registerform.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														{...field}
														disabled={isPending}
														id="email"
														type="email"
														placeholder="m@example.com"
														required
													/>
												</FormControl>
												<FormMessage>
													{
														registerform.formState
															.errors.email
															?.message
													}
												</FormMessage>
											</FormItem>
										)}
									/>
								</Field>
								<Field>
									<FormField
										control={registerform.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Mot de passe
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														disabled={isPending}
														id="password"
														type="password"
														placeholder="********"
														required
													/>
												</FormControl>
												<FormMessage>
													{
														registerform.formState
															.errors.password
															?.message
													}
												</FormMessage>
											</FormItem>
										)}
									/>
								</Field>
								<Field>
									<Button
										type="submit"
										disabled={
											isPending ||
											registerform.formState.isSubmitting
										}
									>
										S'inscrire
									</Button>
									<div className="flex items-center gap-2 relative py-1">
										<Separator orientation="horizontal" />
										<span className="text-sm text-muted-foreground absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card p-1">
											ou
										</span>
									</div>
									<FieldDescription className="text-center">
										Vous avez déjà un compte?{" "}
										<Link href="/login">Se connecter</Link>
									</FieldDescription>
								</Field>
							</FieldGroup>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
