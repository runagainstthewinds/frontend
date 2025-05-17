"use client";

import { useState, type ChangeEvent } from "react";
import { Calendar, Clock, Target } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TrainingPlanFormData } from "@/types/form";
import type { TrainingPlanModalProps } from "@/types/form";
import { createTrainingPlan } from "@/api/trainingPlan";
import { useUserId } from "@/hooks/useUserInfo";

export function TrainingPlanModal({
  open: controlledOpen,
  onOpenChange: controlledSetOpen,
  onSubmit,
}: TrainingPlanModalProps) {
  const userId = useUserId();
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = controlledSetOpen ?? setInternalOpen;

  const [formData, setFormData] = useState<TrainingPlanFormData>({
    planName: "",
    startDate: "",
    endDate: "",
    goalDistance: "",
    difficulty: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDifficultyChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      difficulty: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const dataToSubmit = {
        planName: formData.planName,
        startDate: formData.startDate,
        endDate: formData.endDate,
        goalDistance: Number.parseFloat(formData.goalDistance),
        difficulty: formData.difficulty.toUpperCase(),
      };

      if (userId) {
        await createTrainingPlan(userId, dataToSubmit);
      }

      if (onSubmit) {
        onSubmit(formData);
      }

      setOpen(false);
      setFormData({
        planName: "",
        startDate: "",
        endDate: "",
        goalDistance: "",
        difficulty: "",
      });
    } catch (error) {
      console.error("Error creating training plan:", error);
      // You might want to show an error message to the user here
    }
  };

  const calculateDuration = () => {
    if (!formData.startDate || !formData.endDate) return null;

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.ceil(diffDays / 7);

    return diffWeeks;
  };

  const trainingDuration = calculateDuration();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-teal-600 hover:bg-teal-700 transition shadow-md cursor-pointer">
          Create Training Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-semibold text-slate-900">
            Create Training Plan
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Set up a personalized training plan to achieve your fitness goals
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="planName"
                className="text-sm font-medium text-slate-700"
              >
                Plan Name
              </Label>
              <Input
                id="planName"
                name="planName"
                placeholder="e.g. Marathon Training"
                value={formData.planName}
                onChange={handleInputChange}
                className="border-slate-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="startDate"
                  className="text-sm font-medium text-slate-700"
                >
                  Start Date
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    className="pl-9"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="endDate"
                  className="text-sm font-medium text-slate-700"
                >
                  End Date
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    className="pl-9"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {trainingDuration && (
              <div className="mt-4 p-3 bg-teal-50 border border-teal-200 rounded-md">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-teal-600 mr-2" />
                  <span className="text-sm text-teal-800">
                    Training Duration: <strong>{trainingDuration} weeks</strong>
                  </span>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-200">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="goalDistance"
                    className="text-sm font-medium text-slate-700"
                  >
                    Goal Distance (km)
                  </Label>
                  <div className="relative">
                    <Target className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                      id="goalDistance"
                      name="goalDistance"
                      placeholder="e.g. 42.2"
                      className="pl-9"
                      value={formData.goalDistance}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="difficulty"
                    className="text-sm font-medium text-slate-700"
                  >
                    Difficulty Level
                  </Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={handleDifficultyChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 pt-4 border-t bg-slate-50">
          <h3 className="text-sm font-medium text-slate-700 mb-3">
            Plan Preview
          </h3>
          <div className="bg-white border border-slate-200 rounded-md p-3 space-y-2">
            {formData.planName && (
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Plan:</span>
                <span className="text-sm font-medium text-slate-800">
                  {formData.planName}
                </span>
              </div>
            )}
            {formData.startDate && formData.endDate && (
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Duration:</span>
                <span className="text-sm font-medium text-slate-800">
                  {new Date(formData.startDate).toLocaleDateString()} -{" "}
                  {new Date(formData.endDate).toLocaleDateString()}
                  {trainingDuration && ` (${trainingDuration} weeks)`}
                </span>
              </div>
            )}
            {formData.goalDistance && (
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Distance:</span>
                <span className="text-sm font-medium text-slate-800">
                  {formData.goalDistance} km
                </span>
              </div>
            )}
            {formData.difficulty && (
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Difficulty:</span>
                <span className="text-sm font-medium text-slate-800">
                  {formData.difficulty.charAt(0).toUpperCase() +
                    formData.difficulty.slice(1)}
                </span>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="p-6 pt-4 border-t bg-slate-50">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </Button>
          <Button
            className="bg-teal-600 hover:bg-teal-700 ml-2"
            onClick={handleSubmit}
            disabled={
              !formData.planName ||
              !formData.startDate ||
              !formData.endDate ||
              !formData.goalDistance ||
              !formData.difficulty
            }
          >
            Create Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
