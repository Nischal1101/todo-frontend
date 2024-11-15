import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { useNewTodo } from "@/store/todoStore";
import UpdateTodoForm from "./updateTodoForm";

const UpdateTodoSheet = ({ todoId }: { todoId: number }) => {
  const { isUpdateOpen, onUpdateClose } = useNewTodo();

  return (
    <Sheet open={isUpdateOpen} onOpenChange={onUpdateClose}>
      <SheetContent className="min-w-[28rem] space-y-4">
        <SheetHeader>
          <SheetTitle> Update Todo</SheetTitle>
          <SheetDescription>Edit Todo</SheetDescription>
        </SheetHeader>
        <UpdateTodoForm todoId={todoId} />
      </SheetContent>
    </Sheet>
  );
};

export default UpdateTodoSheet;
