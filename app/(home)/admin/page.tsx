"use client";
import Hero from "@/components/hero";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import SheetBtn from "@/components/sheet-btn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
      </div>

      <Hero title={title} />
    </MaxWidthWrapper>
  );
}
