import { getTasks } from "@/actions/task";
import TodoList from "@/components/todo/todo-list";
import { getSession } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
	const session = await getSession({
		headers: await headers(),
	});
	const tasks = await getTasks(session?.user.id);
	return (
		<div className=" py-6 px-2">
			<TodoList tasks={tasks} />
		</div>
	);
}
