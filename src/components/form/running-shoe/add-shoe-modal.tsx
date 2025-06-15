"use client";

import { useState, type ChangeEvent } from "react";
import { PlusCircle } from "lucide-react";
import { Copyright, Info, Palette, Ruler } from "lucide-react";
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
import type { AddShoeModalProps, AddShoeFormData } from "@/types/form";

export function AddShoeModal({
  open: controlledOpen,
  onOpenChange: controlledSetOpen,
  onSubmit,
}: AddShoeModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = controlledSetOpen ?? setInternalOpen;

  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<AddShoeFormData>({
    model: "",
    brand: "",
    color: "",
    totalMileage: "",
  });

  const parseMileageInput = (value: string) => {
    return value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === "totalMileage") {
      processedValue = parseMileageInput(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const handleSubmit = () => {
    // Validate mileage input
    const isIntegerOk = /^\d{1,6}(?=\.|$)/.test(formData.totalMileage);
    const isDecimalOk = /^\d+(\.\d{0,2})?$/.test(formData.totalMileage);
    if (!isIntegerOk) {
      setError(
        "Total Mileage: Must have 1-6 digit(s) before the decimal point.",
      );
      return;
    }
    if (!isDecimalOk) {
      setError("Total Mileage: Mileage can only have up to 2 decimal places.");
      return;
    }

    const dataToSubmit = {
      model: formData.model.trim(),
      brand: formData.brand.trim(),
      color: formData.color.trim(),
      totalMileage: Number.parseFloat(formData.totalMileage),
    };

    if (onSubmit) {
      onSubmit(dataToSubmit);
    }

    setOpen(false);
    setError(null);

    setFormData({
      brand: "",
      model: "",
      color: "",
      totalMileage: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-teal-600 hover:bg-teal-700 cursor-pointer">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Shoe
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold text-slate-900">
            Add a New Shoe
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Every great run begins with the right shoe
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 pt-0">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="brand"
                  className="text-sm font-medium text-slate-700"
                >
                  Brand
                </Label>
                <div className="relative">
                  <Copyright className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <Input
                    id="brand"
                    name="brand"
                    className="pl-9"
                    value={formData.brand}
                    onChange={handleInputChange}
                    maxLength={20}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="model"
                  className="text-sm font-medium text-slate-700"
                >
                  Model
                </Label>
                <div className="relative">
                  <Info className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <Input
                    id="model"
                    name="model"
                    className="pl-9"
                    value={formData.model}
                    onChange={handleInputChange}
                    maxLength={30}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="color"
                  className="text-sm font-medium text-slate-700"
                >
                  Color
                </Label>
                <div className="relative">
                  <Palette className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <Input
                    id="color"
                    name="color"
                    className="pl-9"
                    value={formData.color}
                    onChange={handleInputChange}
                    maxLength={15}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="totalMileage"
                  className="text-sm font-medium text-slate-700"
                >
                  Total Mileage (km)
                </Label>
                <div className="relative">
                  <Ruler className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <Input
                    id="totalMileage"
                    name="totalMileage"
                    className="pl-9"
                    value={formData.totalMileage}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded -mb-6">
                <div className="flex flex-col">
                  <span className="text-sm">{error}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="p-6 pt-4 border-t bg-slate-50">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            className="bg-teal-600 hover:bg-teal-700 cursor-pointer"
            type="submit"
            onClick={handleSubmit}
            disabled={
              !formData.brand.trim() ||
              !formData.model.trim() ||
              !formData.color.trim() ||
              !formData.totalMileage
            }
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
