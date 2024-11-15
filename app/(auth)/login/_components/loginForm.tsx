"use client";
import AuthBtn from "@/components/auth-btn";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/validators/loginSchema";
import { useAuthStore } from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export type FormValues = z.infer<typeof loginSchema>;
const LoginForm = () => {
  const { setToken } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKENDURL as string}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    const res = await response.json();
    setLoading(false);
    if (res.status === "success") {
      setToken(res.token.accessToken);
      if (res.data.role === "admin") {
        router.push("/admin");
      }
      router.push("/");
      toast.success("user logged in successfully");
    } else if (res.status === "error") {
      toast.error(res.message);
    } else {
      toast.error("something went wrong!");
    }
  };

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
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
        <AuthBtn title="Sign In" loading={loading} />
      </form>
    </Form>
  );
};

export default LoginForm;
