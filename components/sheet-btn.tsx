"use client";
import { Plus } from "lucide-react";
import React from "react";
import TodoSheet from "./todo-sheet";
import { Button } from "./ui/button";
import { useNewTodo } from "@/store/todoStore";

const SheetBtn = () => {
  const { onOpen } = useNewTodo();

  return (
    <>
      <Button onClick={onOpen} variant="default">
        <Plus />
        Add Todos
      </Button>
      <TodoSheet />
    </>
  );
};

export default SheetBtn;
