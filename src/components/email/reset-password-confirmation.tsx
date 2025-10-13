interface ResetPasswordConfirmationProps {
	name?: string | null;
	email: string;
	resetUrl: string;
}

export const ResetPasswordConfirmation: React.FC<
	Readonly<ResetPasswordConfirmationProps>
> = ({ name, email, resetUrl }) => {
	return (
		<div
			style={{ fontFamily: "Inter, Arial, sans-serif", color: "#0f172a" }}
		>
			<table
				width="100%"
				cellPadding={0}
				cellSpacing={0}
				role="presentation"
			>
				<tbody>
					<tr>
						<td style={{ padding: "32px 0", textAlign: "center" }}>
							<h1
								style={{
									fontSize: 24,
									margin: "0 0 8px",
									fontFamily: "var(--font-mono)",
								}}
							>
								niato ai.
							</h1>
						</td>
					</tr>
					<tr>
						<td style={{ padding: "0 24px" }}>
							<h1 style={{ fontSize: 24, margin: "0 0 8px" }}>
								Réinitialiser votre mot de passe
							</h1>
							<p style={{ margin: "0 0 16px", color: "#475569" }}>
								Bonjour {name || "👋"}, nous avons reçu une
								demande de réinitialisation de mot de passe pour
								le compte associé à {email}.
							</p>
							<a
								href={resetUrl}
								style={{
									display: "inline-block",
									backgroundColor: "#0ea5e9",
									color: "#fff",
									padding: "10px 16px",
									borderRadius: 8,
									textDecoration: "none",
									fontWeight: 600,
								}}
							>
								Réinitialiser le mot de passe
							</a>
							<p
								style={{
									marginTop: 24,
									fontSize: 12,
									color: "#64748b",
								}}
							>
								Si vous n&apos;êtes pas à l&apos;origine de
								cette demande, vous pouvez ignorer cet email en
								toute sécurité.
							</p>
							<p
								style={{
									marginTop: 12,
									fontSize: 12,
									color: "#64748b",
								}}
							>
								Si le bouton ne fonctionne pas, copiez-collez ce
								lien dans votre navigateur:
								<br />
								<span style={{ wordBreak: "break-all" }}>
									{resetUrl}
								</span>
							</p>
						</td>
					</tr>
					<tr>
						<td
							style={{
								padding: "24px",
								color: "#94a3b8",
								fontSize: 12,
							}}
						>
							© {new Date().getFullYear()} Niato AI. Tous droits
							réservés.
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default ResetPasswordConfirmation;
