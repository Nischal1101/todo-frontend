import z from "zod";

export const loginSchema = z.object({
  password: z
    .string({ required_error: "password is a required field" })
    .min(5, { message: "password should contain at least 4 characters" }),
  email: z
    .string({ required_error: "email is a required field" })
    .email({ message: " email should be in a correct format" }),
});
