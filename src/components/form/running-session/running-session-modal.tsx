import React, { useState, ChangeEvent } from "react";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShoeSelection from "./shoe-selection-card";
import {
  mockStravaRuns,
  mockShoes,
} from "@/helper/data/fakeTrainingSessionDataForm";
import ManualEntryTab from "./manual-entry-form";
import StravaImportTab from "./strava-import-tab";
import { AddRunSessionModalProps } from "@/types/form";
import { SessionRunFormData } from "@/types/form";

export const AddRunSessionModal: React.FC<AddRunSessionModalProps> = ({
  open: controlledOpen,
  onOpenChange: controlledSetOpen,
  trigger,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = controlledSetOpen ?? setInternalOpen;

  const [activeTab, setActiveTab] = useState<"manual" | "strava">("manual");
  const [intensity, setIntensity] = useState<number[]>([3]);
  const [selectedRun, setSelectedRun] = useState<number | null>(null);
  const [selectedShoe, setSelectedShoe] = useState<number | null>(null);

  const [SessionRunFormData, setSessionRunFormData] =
    useState<SessionRunFormData>({
      distance: "",
      pace: "",
      duration: "",
      intensity: 0,
      shoeId: null,
    });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSessionRunFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIntensityChange = (value: number[]) => {
    setIntensity(value);
    setSessionRunFormData((prev) => ({
      ...prev,
      intensity: value[0],
    }));
  };

  const handleSelectRun = (id: number) => {
    setSelectedRun(id);
  };

  const handleSelectShoe = (id: number) => {
    setSelectedShoe(id);
    setSessionRunFormData((prev) => ({
      ...prev,
      shoeId: id,
    }));
  };

  const handleSubmit = () => {
    const dataToSubmit =
      activeTab === "manual"
        ? { ...SessionRunFormData, shoeId: selectedShoe }
        : {
            ...mockStravaRuns.find((run) => run.id === selectedRun)!,
            shoeId: selectedShoe,
          };

    console.log("Submitting run session:", dataToSubmit);
    setOpen(false);

    setSessionRunFormData({
      distance: "",
      pace: "",
      duration: "",
      intensity: 3,
      shoeId: null,
    });
    setSelectedRun(null);
    setSelectedShoe(null);
    setActiveTab("manual");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="bg-teal-600 hover:bg-teal-700 transition">
            Add Run Session
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-semibold text-slate-900">
            Add Run Session
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Manually enter your run details or import from Strava
          </DialogDescription>
        </DialogHeader>
        <Tabs
          defaultValue="manual"
          value={activeTab}
          onValueChange={(value: string) =>
            setActiveTab(value as "manual" | "strava")
          }
          className="w-full"
        >
          <TabsList className="grid w-full h-full grid-cols-2 bg-white p-2 rounded-lg">
            <TabsTrigger
              value="manual"
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white rounded-md py-2.5 font-medium"
            >
              Manual Entry
            </TabsTrigger>
            <TabsTrigger
              value="strava"
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white rounded-md py-2.5 font-medium"
            >
              Import from Strava
            </TabsTrigger>
          </TabsList>
          <ManualEntryTab
            SessionRunFormData={SessionRunFormData}
            handleInputChange={handleInputChange}
            intensity={intensity}
            handleIntensityChange={handleIntensityChange}
          />
          <StravaImportTab
            runs={mockStravaRuns}
            selectedRun={selectedRun}
            handleSelectRun={handleSelectRun}
            shoes={mockShoes}
          />
        </Tabs>
        <ShoeSelection
          shoes={mockShoes}
          selectedShoe={selectedShoe}
          handleSelectShoe={handleSelectShoe}
        />
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
            onClick={() => {
              handleSubmit();
              setOpen(false);
            }}
            disabled={
              (activeTab === "manual"
                ? !SessionRunFormData.distance ||
                  !SessionRunFormData.pace ||
                  !SessionRunFormData.duration
                : selectedRun === null) || selectedShoe === null
            }
          >
            Save Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
