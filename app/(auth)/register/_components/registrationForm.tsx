"use client";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Mail, LockKeyhole, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { registrationSchema } from "@/lib/validators/registrationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type FormValues = z.infer<typeof registrationSchema>;
const UserRegistrationForm = () => {
  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative flex flex-col items-center justify-center">
                  <Mail className="absolute left-2 top-[0.65rem] " size={15} />
                  <Input
                    type="email"
                    placeholder=" Your Email"
                    {...field}
                    className={`input input-bordered w-full max-w-xs px-8 transition delay-150 ease-in-out hover:border-gray-500 `}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="mt-3 relative flex flex-col items-center justify-center">
                  <User className="absolute left-2 top-[0.65rem] " size={15} />
                  <Input
                    placeholder=" Your name"
                    {...field}
                    className={`input input-bordered w-full max-w-xs px-8 transition delay-150 ease-in-out hover:border-gray-500 `}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative mt-3 flex flex-col items-center justify-center ">
                  <LockKeyhole
                    className="absolute left-2 top-[0.65rem]"
                    size={15}
                  />
                  <Input
                    type="password"
                    placeholder=" Your Password"
                    {...field}
                    className={`input input-bordered w-full max-w-xs px-8 transition delay-150 ease-in-out hover:border-gray-500`}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="btn btn-primary mt-4 w-full max-w-xs ">
          Sign Up
        </Button>
      </form>
    </Form>
  );
};

export default UserRegistrationForm;
/*
 <form>
        <div className="relative flex flex-col items-center justify-center">
          <Mail className="absolute left-2 top-[0.65rem] " size={15} />
          <Input
            type="email"
            placeholder=" Your Email"
            id="email"
            className={`input input-bordered w-full max-w-xs px-8 transition delay-150 ease-in-out hover:border-gray-500 `}
          />
        </div>
        <div className="mt-3 relative flex flex-col items-center justify-center">
          <Mail className="absolute left-2 top-[0.65rem] " size={15} />
          <Input
            type="text"
            placeholder=" Your Username"
            id="username"
            className={`input input-bordered w-full max-w-xs px-8 transition delay-150 ease-in-out hover:border-gray-500 `}
          />
        </div>
        <div className="relative mt-3 flex flex-col items-center justify-center ">
          <LockKeyhole className="absolute left-2 top-[0.65rem]" size={15} />
          <Input
            type="password"
            placeholder=" Your Password"
            id="password"
            className={`input input-bordered w-full max-w-xs px-8 transition delay-150 ease-in-out hover:border-gray-500`}
          />
        </div>

        <Button type="submit" className="btn btn-primary mt-4 w-full max-w-xs ">
          Sign Up
        </Button>
      </form>
*/
