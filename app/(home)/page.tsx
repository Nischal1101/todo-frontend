"use client";
import Hero from "@/components/hero";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import SheetBtn from "@/components/sheet-btn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UpdateBtn from "@/components/updateBtn";
import { useAuthStore } from "@/store/authStore";

import { Filter, Search } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState<string | null>(null);
  const { token } = useAuthStore();

  return (
    <MaxWidthWrapper>
      <div className="py-12 md:py-20 flex justify-between items-center">
        <h1 className="text-xl font-semibold">All Todos</h1>
        {token && <SheetBtn />}
      </div>
      <div className="pb-5 flex justify-between gap-20 md:gap-44 ">
        <div className="relative w-full">
          <Search className="absolute top-[0.6rem] left-2" size={"16"} />
          <Input
            placeholder="Search tasks"
            className="pl-8"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <Button variant={"outline"}>
          <Filter />
          Filter
        </Button>
      </div>
      <Hero title={title} />
    </MaxWidthWrapper>
  );
}
