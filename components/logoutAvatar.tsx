"use client";
import { useAuthStore } from "@/store/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { Button } from "./ui/button";

const LogoutAvatar = () => {
  const { setToken, token } = useAuthStore();
  if (!token) {
    return (
      <Button>
        <Link href="/login">Sign In</Link>
      </Button>
    );
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="size-8 rounded-full">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="size-8 rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Button
              type="submit"
              className="mt-1"
              variant={"ghost"}
              onClick={() => {
                setToken(null);
              }}
            >
              logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default LogoutAvatar;
