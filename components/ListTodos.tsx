import { typeTodo } from "@/lib/validators/todoSchema";
import MyCheckbox from "./myCheckbox";

const ListTodos = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKENDURL as string}/todo/todos`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const res = await response.json();
  const todos: [] | typeTodo[] = res.data;
  console.log(todos);
  return (
    <>
      <div className="flex  flex-col gap-5 mt-5 ">
        {todos.map((todo, index) => (
          <div
            key={index}
            className="w-full border border-black py-3 rounded-md px-4"
          >
            <MyCheckbox todo={todo} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ListTodos;
