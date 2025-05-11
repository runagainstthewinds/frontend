// Training Session

import { ChangeEvent, ReactNode } from "react";
import { StravaRun, Shoe } from "./models";

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

interface SessionRunFormData {
  distance: string;
  pace: string;
  duration: string;
  intensity: number;
  shoeId: number | null;
}

interface SessionRunFormData {
  distance: string;
  pace: string;
  duration: string;
  intensity: number;
  shoeId: number | null;
}

// Training Plan

interface TrainingPlanFormData {
  planName: string;
  startDate: string;
  endDate: string;
  goalDistance: string;
  difficulty: string;
}

interface TrainingPlanModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: TrainingPlanFormData) => void;
}

interface CreateTrainingPlanParams {
  planName: string;
  startDate: string;
  endDate: string;
  goalDistance: number;
  difficulty: string;
}

export type {
  TrainingPlanFormData,
  ManualEntryTabProps,
  StravaImportTabProps,
  ShoeSelectionProps,
  AddRunSessionModalProps,
  SessionRunFormData,
  TrainingPlanModalProps,
  CreateTrainingPlanParams,
};
