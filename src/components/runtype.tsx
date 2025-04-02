import { Badge } from "@/components/ui/badge";

function RunType({
  type,
}: {
  type: "Interval" | "Recovery" | "Long Run" | "Final Run";
}) {
  const colorMap = {
    "Interval": "bg-red-50 text-red-700 hover:bg-red-100 border-red-200",
    "Recovery": "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200",
    "Long Run": "bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200",
    "Final Run": "bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200",
  };

  return (
    <Badge variant="outline" className={colorMap[type]}>
      {type}
    </Badge>
  );
}

export default RunType;
