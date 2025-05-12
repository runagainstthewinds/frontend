import { Progress } from "@/components/ui/progress";
import { Badge } from "lucide-react";
import { Label } from "@/components/ui/label";
import { ShoeSelectionProps } from "@/types/form";

const ShoeSelection: React.FC<ShoeSelectionProps> = ({
  shoes,
  selectedShoe,
  handleSelectShoe,
  loading,
}) => {
  const handleShoeClick = (shoeId: number) => {
    // If the clicked shoe is already selected, unselect it
    if (selectedShoe === shoeId) {
      handleSelectShoe(null);
    } else {
      handleSelectShoe(shoeId);
    }
  };

  if (loading) {
    return (
      <div className="p-6 pt-4 border-t">
        <div className="space-y-3">
          <Label className="text-sm font-medium text-slate-700">
            Loading shoes...
          </Label>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 pt-4 border-t">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-slate-700">
            Select Shoe Used
          </Label>
          {selectedShoe && (
            <Badge className="bg-teal-100 text-teal-800 font-medium">
              {shoes.find((shoe) => shoe.shoeId === selectedShoe)?.totalMileage}{" "}
              km
            </Badge>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[200px] overflow-y-auto pr-1">
          {shoes.map((shoe) => {
            const percentUsed = (shoe.totalMileage / 800) * 100; // Using 800km as max mileage
            const isSelected = selectedShoe === shoe.shoeId;
            return (
              <div 
                key={shoe.shoeId} 
                className="relative"
                onClick={() => handleShoeClick(shoe.shoeId)}
              >
                <div
                  className={`flex items-start gap-3 p-3 border rounded-md cursor-pointer hover:bg-slate-50 ${
                    isSelected ? "border-teal-600 bg-teal-50" : ""
                  }`}
                >
                  <div className="space-y-1 flex-1">
                    <p className="font-medium text-slate-900 text-sm">
                      {shoe.model}
                    </p>
                    <p className="text-xs text-slate-500">
                      {shoe.brand} • {shoe.color}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600">
                        {shoe.totalMileage} / 800 km
                      </span>
                    </div>
                    <Progress value={percentUsed} className="h-1.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShoeSelection;
