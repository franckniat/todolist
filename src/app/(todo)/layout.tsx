import TodoForm from "@/components/todo/todo-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Todo List",
	description: "A simple todo list application",
};

export default function TodoLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="">
			<TodoForm />
			{children}
		</div>
	);
}
