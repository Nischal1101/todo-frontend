"use client";
import { typeTodo } from "@/lib/validators/todoSchema";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";
import { debounce } from "lodash";
import { Clock, Upload } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import MyCheckbox from "./myCheckbox";
import { Button } from "./ui/button";
import UpdateBtn from "./updateBtn";

const Hero = ({ title }: { title: string | null }) => {
  const { token, refetch, setRefetch } = useAuthStore();
  const [todos, setTodos] = useState<[] | typeTodo[]>([]);

  const fetchData = useCallback(
    debounce(async () => {
      try {
        const baseURL = `${
          process.env.NEXT_PUBLIC_BACKENDURL as string
        }/todo/todos`;

        // Make API call
        const { data: res } = await axios.get(baseURL);
        setTodos(res.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
        setTodos([]); // Reset todos on error
      }
    }, 200),
    [token] // Add token to dependencies
  );

  useEffect(() => {
    fetchData();
  }, [refetch, fetchData, token]);

  // Early return for no todos
  if (todos.length === 0) {
    return (
      <section className="bg-gray-50 p-4">
        <p className="text-center text-gray-500">No todos found</p>
      </section>
    );
  }
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
              {token && (
                <>
                  <UpdateBtn todoId={todo.id as number} />
                  <Button
                    variant={"destructive"}
                    onClick={async () => {
                      const { data } = await axios.delete(
                        `${process.env.NEXT_PUBLIC_BACKENDURL as string}/todo/${
                          todo.id
                        }`,
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );

                      if (data.status === "success") {
                        toast.success("deleted!");
                        setRefetch(!refetch);
                      } else {
                        toast.error(String(data.message));
                      }
                    }}
                  >
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Hero;
