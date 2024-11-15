import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import CreateTodoForm from "./addTodoForm";
import { useNewTodo } from "@/store/todoStore";

const TodoSheet = () => {
  const { isOpen, onClose } = useNewTodo();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="min-w-[28rem] space-y-4">
        <SheetHeader>
          <SheetTitle>Create a new Todo</SheetTitle>
          <SheetDescription>Add Todo</SheetDescription>
        </SheetHeader>
        <CreateTodoForm />
      </SheetContent>
    </Sheet>
  );
};

export default TodoSheet;
