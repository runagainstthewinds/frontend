import { useContext, createContext, useState, ReactNode } from "react";

type DistanceUnit = "km" | "mi";
type PaceUnit = "min/km" | "min/mi";

interface UnitContextType {
  distanceUnit: DistanceUnit;
  toggleDistanceUnit: () => void;
  paceUnit: PaceUnit;
  togglePaceUnit: () => void;
}

const UnitContext = createContext<UnitContextType | undefined>(undefined);

export function UnitProvider({ children }: { children: ReactNode }) {
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>("km");
  const [paceUnit, setPaceUnit] = useState<PaceUnit>("min/km");

  const toggleDistanceUnit = () => {
    setDistanceUnit((prev) => (prev === "km" ? "mi" : "km"));
  };

  const togglePaceUnit = () => {
    setPaceUnit((prev) => (prev === "min/km" ? "min/mi" : "min/km"));
  };

  return (
    <UnitContext.Provider
      value={{ distanceUnit, toggleDistanceUnit, paceUnit, togglePaceUnit }}
    >
      {children}
    </UnitContext.Provider>
  );
}

export function useUnit() {
  const context = useContext(UnitContext);
  if (!context) {
    throw new Error("useUnit must be used within a UnitProvider");
  }
  return context;
}
