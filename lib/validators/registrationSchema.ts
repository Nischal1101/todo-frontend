import z from "zod";

export const registrationSchema = z.object({
  name: z
    .string({ message: "username should be a string" })
    .min(4, { message: "name should contain at least 4 characters" }),
  password: z
    .string({ message: "password should be string" })
    .min(5, { message: "password should contain at least 4 characters" }),
  email: z
    .string({ required_error: "email is a required field" })
    .email({ message: " email should be in a correct format" }),
});
