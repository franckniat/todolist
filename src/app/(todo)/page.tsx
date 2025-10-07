import TodoList from "@/components/todo/todo-list";

export default function Home() {
  return(
    <div className=" py-6 px-2">
      <TodoList tasks={[]} />
    </div>
  )
}