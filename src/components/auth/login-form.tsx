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
import type { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const params = useSearchParams();
	const loginform = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const onSubmit = async (data: LoginSchema) => {
		startTransition(async () => {
			await authClient.signIn.email(
				{
					email: data.email,
					password: data.password,
				},
				{
					onRequest: () => {
						toast.info("Patientez un instant ...");
					},
					onSuccess: async () => {
						toast.success("Connexion réussie", {
							description: "Vous êtes maintenant connecté.",
						});
						toast.info("Redirection en cours ...");
						const callbackUrl = params.get("callbackUrl") || "/";
						router.push(callbackUrl);
					},
					onError: (error) => {
						if (error.error.code === "INVALID_EMAIL_OR_PASSWORD") {
							toast.error("Email ou mot de passe invalide", {
								description:
									"Veuillez vérifier vos informations et réessayer.",
							});
							return;
						}

						if (error.error.code === "USER_NOT_FOUND") {
							toast.error("Utilisateur non trouvé", {
								description:
									"Aucun compte n'est associé à cet e-mail.",
							});
							return;
						}

						if (error.error.code === "TOO_MANY_REQUESTS") {
							toast.error("Trop de tentatives", {
								description: "Veuillez réessayer plus tard",
							});
							return;
						}
					},
				},
			);
		});
	};
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Connectez-vous à votre compte</CardTitle>
					<CardDescription>
						Entrez votre e-mail ci-dessous pour vous connecter à
						votre compte
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...loginform}>
						<form onSubmit={loginform.handleSubmit(onSubmit)}>
							<FieldGroup className="gap-4">
								<Field>
									<FormField
										control={loginform.control}
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
														loginform.formState
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
										control={loginform.control}
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
														placeholder="Entrez votre mot de passe"
														required
													/>
												</FormControl>
												<FormMessage>
													{
														loginform.formState
															.errors.password
															?.message
													}
												</FormMessage>
												<FormDescription className="flex items-center justify-end">
													<Link
														href="/forgot-password"
														className="text-sm underline-offset-4 hover:underline"
													>
														Mot de passe oublié ?
													</Link>
												</FormDescription>
											</FormItem>
										)}
									/>
								</Field>
								<Field>
									<Button
										disabled={
											isPending ||
											loginform.formState.isSubmitting
										}
										type="submit"
										className="w-full"
									>
										Se connecter
									</Button>
									<div className="flex items-center gap-2 relative py-1">
										<Separator orientation="horizontal" />
										<span className="text-sm text-muted-foreground absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card p-1">
											ou
										</span>
									</div>
									<FieldDescription className="text-center">
										Vous n&apos;avez pas de compte?{" "}
										<Link href="/register">
											S&apos;inscrire
										</Link>
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
