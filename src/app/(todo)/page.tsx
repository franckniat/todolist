import { getTasks } from "@/actions/task";
import TodoListSkeleton from "@/components/loaders/todo-list-skeleton";
import TodoList from "@/components/todo/todo-list";
import { getSession } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";

async function TodoListWrapper() {
    const session = await getSession({
        headers: await headers(),
    });
    const tasks = await getTasks(session?.user.id);
    return <TodoList tasks={tasks} />;
}

export default async function Home() {
	return (
		<div className=" py-6 px-2">
			<Suspense fallback={<TodoListSkeleton />}>
                <TodoListWrapper />
            </Suspense>
		</div>
	);
}
