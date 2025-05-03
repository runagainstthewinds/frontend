import { TrainingType } from "../types/models";

const mapTrainingTypeToRunType = (
  trainingType: TrainingType,
): "Interval" | "Recovery" | "Long Run" | "Final Run" => {
  switch (trainingType) {
    case TrainingType.INTERVAL:
      return "Interval";
    case TrainingType.LONG_RUN:
      return "Long Run";
    case TrainingType.RECOVERY_RUN:
      return "Recovery";
    case TrainingType.UNSPECIFIED:
    case TrainingType.TEMPO:
    default:
      return "Final Run";
  }
};

const mapResponseToRunType = (
  input: string,
):
  | "Interval"
  | "Recovery"
  | "Long Run"
  | "Final Run"
  | "Unspecified"
  | "Tempo" => {
  switch (input) {
    case "LONG_RUN":
      return "Long Run";
    case "RECOVERY_RUN":
      return "Recovery";
    case "INTERVAL":
      return "Interval";
    case "FINAL_RUN":
      return "Final Run";
    case "UNSPECIFIED":
      return "Unspecified";
    case "TEMPO":
      return "Tempo";
    default:
      return "Unspecified";
  }
};

export { mapTrainingTypeToRunType, mapResponseToRunType };
