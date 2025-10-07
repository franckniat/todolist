import {Resend} from "resend";
import { getUserByEmail } from "@/actions/user";
import { VerifyEmail } from "@/components/email/verify-email";
import { ResetPasswordConfirmation } from "@/components/email/reset-password-confirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEMail = async (email:string, url:string)=>{
    const user = await getUserByEmail(email)
    if(!user) return {
        error: "Utilisateur non trouvé !"
    };
    await resend.emails.send({
        from: "Todolist <donot-reply@todo.franckniat.me>",
        to: email,
        subject: "Vérification de votre adresse email",
        react: VerifyEmail({
            name: user.name,
            email,
            verifyUrl: url,
        }) as React.ReactElement,
    })
}

export const sendResetPasswordEMail = async (email:string, url:string)=>{
    const user = await getUserByEmail(email)
    if(!user) return {
        error: "Utilisateur non trouvé !"
    };
    await resend.emails.send({
        from: "Todolist <donot-reply@todo.franckniat.me>",
        to: email,
        subject: "Réinitialisation de votre mot de passe",
        react: ResetPasswordConfirmation({
            name: user?.name,
            email,
            resetUrl: url,
        }) as React.ReactElement,
    })
}
