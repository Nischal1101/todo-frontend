import { CheckCircle } from "lucide-react";
import Link from "next/link";
import LoginForm from "./_components/loginForm";

const LoginPage = () => {
  return (
    <div className="flex h-screen items-center justify-center  px-4 sm:px-6 lg:px-8">
      <div className="w-96 p-8 shadow-2xl ">
        <div className="flex gap-2 items-center justify-center">
          <CheckCircle color="blue" size={"28"} />
          <h1 className="py-8 text-center text-3xl font-semibold">Todo.</h1>
        </div>
        <LoginForm />

        <hr className="my-8" />

        <p className="mt-3 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
