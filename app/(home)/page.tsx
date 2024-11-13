import MaxWidthWrapper from "@/components/maxWidthWrapper";
import SheetBtn from "@/components/sheet-btn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Filter, Search } from "lucide-react";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="py-12 md:py-20 flex justify-between items-center">
        <h1 className="text-xl font-semibold">My Tasks</h1>
        <SheetBtn />
      </div>
      <div className="pb-5 flex justify-between gap-20 md:gap-44 ">
        <div className="relative w-full">
          <Search className="absolute top-[0.6rem] left-2" size={"16"} />
          <Input placeholder="Search tasks" className="pl-8" />
        </div>
        <Button variant={"outline"}>
          <Filter />
          Filter
        </Button>
      </div>
    </MaxWidthWrapper>
  );
}
