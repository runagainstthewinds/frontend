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

  const [formData, setFormData] = useState<AddShoeFormData >(
    {
      model: "",
      brand: "",
      color: "",
      totalMileage: "",
    }
  );

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
      totalMileage: Number.parseFloat(formData.totalMileage),
    };

    console.log("Adding new shoe:", dataToSubmit);

    if (onSubmit) {
      onSubmit(dataToSubmit);
    }

    setOpen(false);

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
            className="bg-teal-600 hover:bg-teal-700 ml-2 cursor-pointer"
            onClick={handleSubmit}
            disabled={
              !formData.brand ||
              !formData.model ||
              !formData.color ||
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