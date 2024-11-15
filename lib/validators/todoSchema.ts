import { z } from "zod";
const priorityValues = ["high", "medium", "low"] as const;
const statusValues = ["complete", "incomplete"] as const;
const isServer = typeof window === "undefined";

export const todoSchema = z.object({
  id: z.number().optional(),
  description: z
    .string({ required_error: " description is  a required field" })
    .min(8, { message: "description must contain at least 8 chars" }),
  title: z
    .string({ required_error: "title is  a required field" })
    .min(5, { message: "title must contain at least 5 chars" }),
  file: z.instanceof(isServer ? File : FileList, {
    message: "product image should be an image",
  }),
  priority: z.enum(priorityValues).default("medium"),
  status: z.enum(statusValues).default("incomplete"),
  dueDate: z.date({
    required_error: "Due date is a required field.",
  }),
});
export type typeTodo = z.infer<typeof todoSchema>;
