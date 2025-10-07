import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function UserAvatar({
	user,
}: {
	user: { name: string; image?: string | null };
}) {
	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((word) => word[0])
			.join("")
			.toUpperCase();
	};
	return (
		<Avatar className="h-8 w-8 rounded-lg">
			{user.image && <AvatarImage src={user.image} alt={user.name} />}
			<AvatarFallback className="rounded-lg">
				{getInitials(user.name)}
			</AvatarFallback>
		</Avatar>
	);
}
