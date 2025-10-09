import { z } from "zod";
export const registerSchema = z.object({
	name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
	email: z.string().email("Adresse email invalide"),
	password: z
		.string()
		.refine(
			(value) => value.length >= 8,
			"Le mot de passe doit contenir au moins 8 caractères",
		)
		.refine((value) => {
			const hasNumber = /\d/.test(value);
			const hasUppercase = /[A-Z]/.test(value);
			const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
			return hasNumber && hasUppercase && hasSpecialChar;
		}, "Le mot de passe doit contenir au moins un chiffre, une lettre majuscule et un caractère spécial"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
	email: z.string().email("Adresse email invalide"),
	password: z.string(),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
	email: z.string().email("Adresse email invalide"),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
	password: z
		.string()
		.refine(
			(value) => value.length >= 8,
			"Le mot de passe doit contenir au moins 8 caractères",
		)
		.refine((value) => {
			const hasNumber = /\d/.test(value);
			const hasUppercase = /[A-Z]/.test(value);
			const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
			return hasNumber && hasUppercase && hasSpecialChar;
		}, "Le mot de passe doit contenir au moins un chiffre, une lettre majuscule et un caractère spécial"),
	passwordConfirmation: z.string(),
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
