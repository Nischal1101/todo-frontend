"use client";
import { typeTodo } from "@/lib/validators/todoSchema";
import { Clock, Upload } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import MyCheckbox from "@/components/myCheckbox";

const Page = () => {
  const { token, user } = useAuthStore();
  console.log(token);
  const [todos, setTodos] = useState<[] | typeTodo[]>([]);
  useEffect(() => {
    async function fetchData() {
      const { data: res } = await axios.get("http://localhost:8000/api/todo", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(res.data);
    }
    fetchData();
  }, [token]);
  return (
    <section className="bg-gray-50 space-y-4">
      {todos.map((todo, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <MyCheckbox title={todo.title} status={todo.status} />
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    todo.priority === "high"
                      ? "bg-red-100 text-red-800"
                      : todo.priority === "medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {todo.priority}
                </span>
              </div>
              <p className="mt-1 text-gray-600">{todo.description}</p>
              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Due {todo.dueDate}</span>
                </div>
                {todo.file && (
                  <div className="flex items-center">
                    <Upload className="h-4 w-4 mr-1" />
                    <span>file</span>
                  </div>
                )}
              </div>
            </div>
            <div className="ml-4 flex gap-2 md:gap-4">
              {token && user?.role === "admin" && (
                <Button variant={"destructive"}>Delete</Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Page;
