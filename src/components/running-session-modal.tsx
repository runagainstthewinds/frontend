import React, { useState, ChangeEvent, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Timer,
  TrendingUp,
  Clock,
  RotateCcw,
  ChevronRight,
} from "lucide-react";
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
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Shoe, StravaRun, SessionRunFormData } from "@/types/models";
import { useUnit } from "@/context/UnitContext";
import { kmToMiles, milesToKm, paceConverter } from "@/lib/utils";

const mockShoes: Shoe[] = [
  {
    id: 1,
    name: "Nike Pegasus 39",
    brand: "Nike",
    image: "/pegasus.webp?height=80&width=120",
    currentMileage: 320,
    maxMileage: 500,
    color: "Blue/White",
    purchaseDate: "2023-05-15",
  },
  {
    id: 2,
    name: "Hoka Clifton 8",
    brand: "Hoka",
    image: "/clifton.webp?height=80&width=120",
    currentMileage: 160,
    maxMileage: 450,
    color: "Black/Orange",
    purchaseDate: "2023-08-22",
  },
  {
    id: 3,
    name: "Brooks Ghost 14",
    brand: "Brooks",
    image: "/brooks.avif?height=80&width=120",
    currentMileage: 410,
    maxMileage: 500,
    color: "Gray/Yellow",
    purchaseDate: "2023-02-10",
  },
  {
    id: 4,
    name: "Saucony Ride 15",
    brand: "Saucony",
    image: "/saucony.webp?height=80&width=120",
    currentMileage: 75,
    maxMileage: 450,
    color: "Red/White",
    purchaseDate: "2023-11-05",
  },
];

const mockStravaRuns: StravaRun[] = [
  {
    id: 1,
    title: "Morning Run",
    time: "7:15 AM",
    distance: 5.2,
    pace: "5:30",
    duration: "28:36",
    intensity: 3,
  },
  {
    id: 2,
    title: "Lunch Break Run",
    time: "12:30 PM",
    distance: 3.5,
    pace: "5:45",
    duration: "20:08",
    intensity: 2,
  },
  {
    id: 3,
    title: "Evening Trail Run",
    time: "6:20 PM",
    distance: 8.1,
    pace: "6:10",
    duration: "50:02",
    intensity: 4,
  },
];

interface ManualEntryTabProps {
  SessionRunFormData: SessionRunFormData;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  intensity: number[];
  handleIntensityChange: (value: number[]) => void;
}

interface StravaImportTabProps {
  runs: StravaRun[];
  selectedRun: number | null;
  handleSelectRun: (id: number) => void;
  shoes: Shoe[];
}

interface ShoeSelectionProps {
  shoes: Shoe[];
  selectedShoe: number | null;
  handleSelectShoe: (id: number) => void;
}

interface AddRunSessionModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
}

const ManualEntryTab: React.FC<ManualEntryTabProps> = ({
  SessionRunFormData,
  handleInputChange,
  intensity,
  handleIntensityChange,
}) => {
  const { distanceUnit } = useUnit();
  return (
    <TabsContent value="manual" className="p-6 pt-4">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="distance"
              className="text-sm font-medium text-slate-700"
            >
              {distanceUnit === "km" ? `Distance (km)` : `Distance (mi)`}
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
              {distanceUnit === "km" ? `Pace (min/km)` : `Pace (min/mi)`}
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

const StravaImportTab: React.FC<StravaImportTabProps> = ({
  runs,
  selectedRun,
  handleSelectRun,
  shoes,
}) => {
  const { distanceUnit } = useUnit();
  return (
    <TabsContent value="strava" className="p-0">
      <div className="p-6 pb-3 border-b">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">Select a run from today</p>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center text-teal-600 border-teal-200 hover:bg-teal-50"
          >
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
            Refresh
          </Button>
        </div>
      </div>
      <div className="max-h-[300px] overflow-y-auto">
        <AnimatePresence>
          {runs.map((run: StravaRun) => (
            <motion.div
              key={run.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className={`p-4 border-b cursor-pointer hover:bg-slate-50 transition ${
                  selectedRun === run.id ? "bg-teal-50" : ""
                }`}
                onClick={() => handleSelectRun(run.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-slate-900">{run.title}</h4>
                    <p className="text-sm text-slate-500">{run.time}</p>
                  </div>
                  <div className="flex items-center">
                    {selectedRun === run.id && (
                      <Badge className="mr-2 bg-teal-600">Selected</Badge>
                    )}
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="flex items-center text-sm text-slate-700">
                    <TrendingUp className="h-3.5 w-3.5 mr-1.5 text-slate-500" />
                    {distanceUnit === "km"
                      ? `${run.distance} km`
                      : `${kmToMiles(run.distance)} mi`}
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    <Timer className="h-3.5 w-3.5 mr-1.5 text-slate-500" />
                    {distanceUnit === "km"
                      ? `${run.pace} min/km`
                      : `${paceConverter(run.pace, "km")} min/mi`}
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    <Clock className="h-3.5 w-3.5 mr-1.5 text-slate-500" />
                    {run.duration}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </TabsContent>
  );
};

// Shoe Selection Component
const ShoeSelection: React.FC<ShoeSelectionProps> = ({
  shoes,
  selectedShoe,
  handleSelectShoe,
}) => {
  const { distanceUnit } = useUnit();
  return (
    <div className="p-6 pt-4 border-t">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-slate-700">
            Select Shoe Used
          </Label>
          {selectedShoe && (
            <Badge className="bg-teal-100 text-teal-800 font-medium">
              {distanceUnit === "km"
                ? `${shoes.find((shoe) => shoe.id === selectedShoe)?.currentMileage} km`
                : `${kmToMiles(shoes.find((shoe) => shoe.id === selectedShoe)?.currentMileage ?? 0)} mi`}
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
                          {distanceUnit === "km"
                            ? `${shoe.currentMileage} / ${shoe.maxMileage} km`
                            : `${kmToMiles(shoe.currentMileage)} / ${kmToMiles(shoe.maxMileage)} mi`}
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

// --- Main Modal Component ---
export const AddRunSessionModal: React.FC<AddRunSessionModalProps> = ({
  open: controlledOpen,
  onOpenChange: controlledSetOpen,
  trigger,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = controlledSetOpen ?? setInternalOpen;
  const { distanceUnit } = useUnit();

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
        ? {
            ...SessionRunFormData,
            // ensure distance is in km when submitting
            distance:
              distanceUnit === "km"
                ? SessionRunFormData.distance
                : milesToKm(Number(SessionRunFormData.distance)),
            // ensure pace is in min/km when submitting
            pace:
              distanceUnit === "km"
                ? SessionRunFormData.pace // This might lead to problems if pace is formatted as a number
                : paceConverter(SessionRunFormData.pace, "mi"),
            shoeId: selectedShoe,
          }
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
