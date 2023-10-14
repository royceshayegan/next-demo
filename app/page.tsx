import TodoList from "@/app/components/TodoList";
export default async function Home() {
  return (
    <>
      <div className="max-w-[700px] mx-auto px-3 flex flex-col justify-center items-center h-full w-full">
        <TodoList></TodoList>
      </div>
    </>
  );
}