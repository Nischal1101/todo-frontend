import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export default function MyCheckbox({
  title,
  status,
}: {
  title: string;
  status: "complete" | "incomplete";
}) {
  return (
    <div className="flex items-center gap-2 ">
      <Checkbox id="checkbox-05" checked={status === "complete"} />
      <Label
        htmlFor="checkbox-05"
        className={`${status === "complete" && "line-through"}`}
      >
        {title}
      </Label>
    </div>
  );
}
