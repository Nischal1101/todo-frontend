import React from "react";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";

const AuthBtn = ({ title, loading }: { title: string; loading: boolean }) => {
  return (
    <>
      <Button
        type="submit"
        className="btn btn-primary mt-4 w-full max-w-xs "
        disabled={loading}
      >
        {title}
        {loading && <LoaderCircle className="animate-spin" />}
      </Button>
    </>
  );
};

export default AuthBtn;
