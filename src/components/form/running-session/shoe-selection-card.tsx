import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "lucide-react";
import { Label } from "@/components/ui/label";
import { ShoeSelectionProps } from "@/types/form";

const ShoeSelection: React.FC<ShoeSelectionProps> = ({
  shoes,
  selectedShoe,
  handleSelectShoe,
}) => {
  return (
    <div className="p-6 pt-4 border-t">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-slate-700">
            Select Shoe Used
          </Label>
          {selectedShoe && (
            <Badge className="bg-teal-100 text-teal-800 font-medium">
              {shoes.find((shoe) => shoe.id === selectedShoe)?.currentMileage}{" "}
              km
            </Badge>
          )}
        </div>
        <RadioGroup
          value={selectedShoe?.toString() || ""}
          onValueChange={(value) => handleSelectShoe(parseInt(value))}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[200px] overflow-y-auto pr-1">
            {shoes.map((shoe) => {
              const percentUsed = (shoe.currentMileage / shoe.maxMileage) * 100;
              return (
                <div key={shoe.id} className="relative">
                  <RadioGroupItem
                    value={shoe.id.toString()}
                    id={`shoe-${shoe.id}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`shoe-${shoe.id}`}
                    className="flex items-start gap-3 p-3 border rounded-md cursor-pointer hover:bg-slate-50 peer-data-[state=checked]:border-teal-600 peer-data-[state=checked]:bg-teal-50"
                  >
                    <div className="h-16 w-16 rounded-md border bg-muted flex items-center justify-center overflow-hidden shrink-0">
                      {/* Use built-in img tag */}
                      <img
                        src={shoe.image || "/placeholder.svg"}
                        alt={shoe.name}
                        width={80}
                        height={60}
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1 flex-1">
                      <p className="font-medium text-slate-900 text-sm">
                        {shoe.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {shoe.brand} • {shoe.color}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600">
                          {shoe.currentMileage} / {shoe.maxMileage} km
                        </span>
                      </div>
                      <Progress value={percentUsed} className="h-1.5" />
                    </div>
                  </Label>
                </div>
              );
            })}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default ShoeSelection;
