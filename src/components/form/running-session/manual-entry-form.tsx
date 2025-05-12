import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { TabsContent } from "@/components/ui/tabs";
import { ManualEntryTabProps } from "@/types/form";
import { Clock, Timer, TrendingUp } from "lucide-react";

const ManualEntryTab: React.FC<ManualEntryTabProps> = ({
  SessionRunFormData,
  handleInputChange,
  intensity,
  handleIntensityChange,
}) => {
  return (
    <TabsContent value="manual" className="p-6 pt-4">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="distance"
              className="text-sm font-medium text-slate-700"
            >
              Distance (km)
            </Label>
            <div className="relative">
              <TrendingUp className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                id="distance"
                name="distance"
                placeholder="0.0"
                className="pl-9"
                value={SessionRunFormData.distance}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="pace"
              className="text-sm font-medium text-slate-700"
            >
              Pace (min/km)
            </Label>
            <div className="relative">
              <Timer className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                id="pace"
                name="pace"
                placeholder="0:00"
                className="pl-9"
                value={SessionRunFormData.pace}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="duration"
            className="text-sm font-medium text-slate-700"
          >
            Total Time
          </Label>
          <div className="relative">
            <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              id="duration"
              name="duration"
              placeholder="00:00:00"
              className="pl-9"
              value={SessionRunFormData.duration}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium text-slate-700">
              Perceived Intensity
            </Label>
            <Badge className="bg-teal-100 text-teal-800 font-medium">
              {intensity[0]}/5
            </Badge>
          </div>
          <Slider
            defaultValue={[3]}
            max={5}
            step={1}
            value={intensity}
            onValueChange={handleIntensityChange}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-slate-500 px-1">
            <span>Easy</span>
            <span>Moderate</span>
            <span>Hard</span>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default ManualEntryTab;
