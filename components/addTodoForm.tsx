"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { todoSchema } from "@/lib/validators/todoSchema";
import { useAuthStore } from "@/store/authStore";
import { useNewTodo } from "@/store/todoStore";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Calendar } from "./ui/calendar";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

export type FormValues = z.infer<typeof todoSchema>;

const CreateTodoForm = () => {
  const router = useRouter();
  const { token, refetch, setRefetch } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const { onClose } = useNewTodo();
  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("description", values.description);
    formData.append("title", values.title);
    formData.append("file", (values.file as FileList)[0]);
    formData.append("dueDate", values.dueDate.toISOString());
    formData.append("priority", values.priority);

    const { data: res } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKENDURL as string}/todo`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === "error") {
      setLoading(false);
      toast.error(res.message);
    } else if (res.status === "success") {
      router.refresh();
      form.reset();

      onClose();
    } else {
      toast.error("something went wrong!");
    }
    setRefetch(!refetch);
    setLoading(false);
  };
  const form = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      priority: "medium",
      description: "",
      title: "",
    },
  });
  const fileRef = form.register("file");

  return (
    <>
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Todo1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Priority</FormLabel>
                <FormControl>
                  <RadioGroup
                    defaultValue={"medium"}
                    value={field.value}
                    className="flex gap-2 mt-5 "
                    onValueChange={field.onChange}
                  >
                    <div>
                      <RadioGroupItem
                        value="high"
                        id="high"
                        className="peer sr-only"
                        aria-label="High"
                      />
                      <Label
                        htmlFor="high"
                        className="cursor-pointer flex w-full  items-center py-[0.7rem] border rounded-md px-3 justify-center  hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:bg-primary peer-data-[state=checked]:text-white [&:has([data-state=checked])]:text-white"
                      >
                        High
                      </Label>
                    </div>

                    <div>
                      <RadioGroupItem
                        value="medium"
                        id="medium"
                        className="peer sr-only"
                        aria-label="Medium"
                      />
                      <Label
                        htmlFor="medium"
                        className="cursor-pointer flex w-full  items-center py-[0.7rem] border rounded-md px-3 justify-center  hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:bg-primary peer-data-[state=checked]:text-white [&:has([data-state=checked])]:text-white"
                      >
                        Medium
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="low"
                        id="low"
                        className="peer sr-only"
                        aria-label="Low"
                      />
                      <Label
                        htmlFor="low"
                        className="cursor-pointer flex w-full  items-center py-[0.7rem] border rounded-md px-3 justify-center  hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:bg-primary peer-data-[state=checked]:text-white [&:has([data-state=checked])]:text-white"
                      >
                        Low
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Select due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date <= new Date() || date <= new Date(Date.now())
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="file"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input type="file" {...fileRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Add todo {loading && <LoaderCircle className="animate-spin" />}
          </Button>
        </form>
      </Form>
    </>
  );
};
export default CreateTodoForm;
