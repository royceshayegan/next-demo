import TodoList from "@/app/components/TodoList";
export default async function Home() {
  return (
    <>
      <div className="flex justify-center py-16 lg:py-48 items-start mx-[4%]">
        <div className="max-w-2xl flex flex-col justify-center items-center h-full w-full">
          <TodoList></TodoList>
        </div>
      </div>
    </>
  );
}
