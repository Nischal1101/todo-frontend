import { z } from "zod";
const priorityValues = ["high", "medium", "low"] as const;
const statusValues = ["complete", "incomplete"] as const;
const isServer = typeof window === "undefined";

export const todoSchema = z.object({
  name: z.string({ message: "product name should be a string" }).min(4),
  description: z
    .string({ message: "product description should be string" })
    .min(8),
  title: z.string({ message: "product price should be a string" }).min(10),
  file: z.instanceof(isServer ? File : FileList, {
    message: "product image should be an image",
  }),
  priority: z.enum(priorityValues).default("medium"),
  status: z.enum(statusValues).default("incomplete"),
  dueDate: z.date({
    required_error: "Due date is required.",
  }),
});
