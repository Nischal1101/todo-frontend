import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { Bell, CheckCircle, User } from "lucide-react";

const Navbar = () => {
  return (
    <div className="sticky inset-x-0 top-0 z-50 bg-white shadow-sm">
      <header className=" bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center justify-between">
              <div className="flex gap-4 items-center justify-center">
                <CheckCircle color="blue" size={"28"} />
                <h1 className="text-2xl font-bold ">Todo.</h1>
              </div>
              <div className="  items-center gap-8 flex ">
                <Bell />
                <User />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
