"use client";

import { useState, type ChangeEvent } from "react";
import { Calendar, Clock, Award, Target } from "lucide-react";
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
import type { TrainingPlanFormData } from "@/types/form";
import type { TrainingPlanModalProps } from "@/types/form";
import { useUnit } from "@/context/UnitContext";
import { kmToMiles, paceConverter } from "@/lib/utils";

export function TrainingPlanModal({
  open: controlledOpen,
  onOpenChange: controlledSetOpen,
  onSubmit,
}: TrainingPlanModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = controlledSetOpen ?? setInternalOpen;
  const { distanceUnit } = useUnit();

  const [formData, setFormData] = useState<TrainingPlanFormData>({
    planName: "",
    startDate: "",
    endDate: "",
    goalDistance: "",
    goalTime: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const dataToSubmit = {
      ...formData,
      goalDistance: Number.parseFloat(formData.goalDistance),
      goalTime: Number.parseFloat(formData.goalTime),
    };

    console.log("Creating training plan:", dataToSubmit);

    if (onSubmit) {
      onSubmit(formData);
    }

    setOpen(false);

    setFormData({
      planName: "",
      startDate: "",
      endDate: "",
      goalDistance: "",
      goalTime: "",
    });
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

  const formatTime = (minutes: string) => {
    if (!minutes || isNaN(Number(minutes))) return "";

    const mins = Number.parseInt(minutes, 10);
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;

    return `${hours}:${remainingMins.toString().padStart(2, "0")}`;
  };

  const calculatePace = () => {
    if (!formData.goalDistance || !formData.goalTime) return null;

    const distance = Number.parseFloat(formData.goalDistance);
    const timeInMinutes = Number.parseFloat(formData.goalTime);

    if (isNaN(distance) || isNaN(timeInMinutes) || distance === 0) return null;

    const paceMinutes = timeInMinutes / distance;
    const paceMinutesWhole = Math.floor(paceMinutes);
    const paceSeconds = Math.round((paceMinutes - paceMinutesWhole) * 60);

    return `${paceMinutesWhole}:${paceSeconds.toString().padStart(2, "0")}`;
  };

  const pace =
    distanceUnit === "km"
      ? calculatePace()
      : paceConverter(calculatePace() || "", "km");

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
                    Goal Distance ({distanceUnit})
                  </Label>
                  <div className="relative">
                    <Target className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                      id="goalDistance"
                      name="goalDistance"
                      placeholder={
                        distanceUnit === "km" ? "e.g. 42.2" : "e.g. 26.2"
                      }
                      className="pl-9"
                      value={
                        distanceUnit === "km"
                          ? formData.goalDistance
                          : kmToMiles(Number(formData.goalDistance), 1)
                      }
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="goalTime"
                    className="text-sm font-medium text-slate-700"
                  >
                    Goal Time (minutes)
                  </Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                      id="goalTime"
                      name="goalTime"
                      placeholder="e.g. 240"
                      className="pl-9"
                      value={formData.goalTime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {pace && (
                <div className="mt-4 p-3 bg-teal-50 border border-teal-200 rounded-md">
                  <div className="flex items-center">
                    <Award className="h-4 w-4 text-teal-600 mr-2" />
                    <span className="text-sm text-teal-800">
                      Target Pace:{" "}
                      <strong>
                        {pace} min/{distanceUnit}
                      </strong>{" "}
                      ({formatTime(formData.goalTime)} for{" "}
                      {distanceUnit === "km"
                        ? formData.goalDistance
                        : kmToMiles(parseFloat(formData.goalDistance))}{" "}
                      {distanceUnit})
                    </span>
                  </div>
                </div>
              )}
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
                  {distanceUnit === "km"
                    ? `${formData.goalDistance} km`
                    : `${kmToMiles(parseFloat(formData.goalDistance))} mi`}
                </span>
              </div>
            )}
            {formData.goalTime && (
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Target Time:</span>
                <span className="text-sm font-medium text-slate-800">
                  {formatTime(formData.goalTime)}
                </span>
              </div>
            )}
            {pace && (
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Target Pace:</span>
                <span className="text-sm font-medium text-slate-800">
                  {pace} min/{distanceUnit}
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
              !formData.goalTime
            }
          >
            Create Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
