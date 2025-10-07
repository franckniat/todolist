
interface VerifyEmailProps {
    name?: string | null
    email: string
    verifyUrl: string
}

export const VerifyEmail: React.FC<Readonly<VerifyEmailProps>> = ({ name, email, verifyUrl }) => {
    return (
        <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#0f172a' }}>
            <table width="100%" cellPadding={0} cellSpacing={0} role="presentation">
                <tbody>
                    <tr>
                        <td style={{ padding: '32px 0', textAlign: 'center' }}>
                            <h1
                                style={{
                                    fontSize: 24,
                                    margin: '0 0 8px',
                                    fontFamily: 'var(--font-mono)',
                                }}
                            >
                                niato ai.
                            </h1>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '0 24px' }}>
                            <h1 style={{ fontSize: 24, margin: '0 0 8px' }}>
                                Vérifiez votre email
                            </h1>
                            <p style={{ margin: '0 0 16px', color: '#475569' }}>
                                Bonjour {name || '👋'}, confirmez votre adresse email pour activer
                                votre compte Niato AI.
                            </p>
                            <p style={{ margin: '0 0 24px', color: '#475569' }}>Adresse: {email}</p>
                            <a
                                href={verifyUrl}
                                style={{
                                    display: 'inline-block',
                                    backgroundColor: '#0ea5e9',
                                    color: '#fff',
                                    padding: '10px 16px',
                                    borderRadius: 8,
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                }}
                            >
                                Vérifier mon email
                            </a>
                            <p style={{ marginTop: 24, fontSize: 12, color: '#64748b' }}>
                                Si le bouton ne fonctionne pas, copiez-collez ce lien dans votre
                                navigateur:
                                <br />
                                <span style={{ wordBreak: 'break-all' }}>{verifyUrl}</span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ padding: '24px', color: '#94a3b8', fontSize: 12 }}>
                            © {new Date().getFullYear()} Niato AI. Tous droits réservés.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default VerifyEmail
