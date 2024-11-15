"use client";
import { useNewTodo } from "@/store/todoStore";
import { Edit } from "lucide-react";
import { Button } from "./ui/button";
import UpdateTodoSheet from "./update-todo-sheet";

const UpdateBtn = ({ todoId }: { todoId: number }) => {
  const { onUpdateOpen } = useNewTodo();
  console.log("updatebtn clicked");
  return (
    <>
      <Button onClick={onUpdateOpen} variant="outline">
        <Edit />
        Update Todos
      </Button>
      <UpdateTodoSheet todoId={todoId} />
    </>
  );
};

export default UpdateBtn;
