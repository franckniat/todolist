import {
	Body,
	Button,
	Container,
	Head,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Text,
} from '@react-email/components';

interface VerifyEmailProps {
	name?: string | null;
	email: string;
	verifyUrl: string;
}

const baseUrl = process.env.BETTER_AUTH_URL
	? `https://${process.env.BETTER_AUTH_URL}`
	: '';

export const VerifyEmail: React.FC<Readonly<VerifyEmailProps>> = ({
	name,
	email,
	verifyUrl,
}) => {
	return (
		<Html>
			<Head />
			<Body style={main}>
				<Preview>Confirm your email for Todolist</Preview>
				<Container style={container}>
					<Img
						src={`${baseUrl}/favicon.png`}
						width="40"
						height="33"
						alt="todolist"
					/>
					<Section>
						<Text style={text}>Hi {name || email},</Text>
						<Text style={text}>
							Welcome! Please confirm your email address to activate your
							Todolist account.
						</Text>
						<Button style={button} href={verifyUrl}>
							Verify email
						</Button>
						<Text style={text}>
							If you didn&apos;t create an account with this email, you can
							safely ignore this message.
						</Text>
						<Text style={text}>
							For your security, don&apos;t forward this email to anyone. See
							our Help Center for{' '}
							<Link style={anchor} href={`https://${baseUrl}/help/security`}>
								more security tips.
							</Link>
						</Text>
						<Text style={text}>Happy Todolisting!</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};

export default VerifyEmail;

const main = {
	backgroundColor: '#f6f9fc',
	padding: '10px 0',
};

const container = {
	backgroundColor: '#ffffff',
	border: '1px solid #f0f0f0',
	padding: '45px',
};

const text = {
	fontSize: '16px',
	fontFamily:
		"'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
	fontWeight: '300',
	color: '#404040',
	lineHeight: '26px',
};

const button = {
	backgroundColor: '#007ee6',
	borderRadius: '4px',
	color: '#fff',
	fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
	fontSize: '15px',
	textDecoration: 'none',
	textAlign: 'center' as const,
	display: 'block',
	width: '210px',
	padding: '14px 7px',
};

const anchor = {
	textDecoration: 'underline',
};
