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

export default mapTrainingTypeToRunType;
