export interface Shoe {
  shoeId: number;
  model: string;
  brand: string;
  color: string;
  totalMileage: number;
  date: string;
  userId: string;
  image?: string;
}

interface StravaRun {
  id: number;
  title: string;
  time: string;
  distance: number;
  pace: string;
  duration: string;
  intensity: number;
}

export enum TrainingType {
  INTERVAL = "Interval",
  TEMPO = "Tempo",
  LONG_RUN = "Long Run",
  RECOVERY_RUN = "Recovery Run",
  UNSPECIFIED = "Other",
}

interface TrainingSession {
  trainingSessionId: number;
  date: Date;
  distance: number;
  achievedDistance: number;
  pace: number;
  achievedPace: number;
  trainingType: TrainingType;
  isComplete: boolean;
  duration: number;
  achievedDuration: number;
  shoeId: number | null;
  notes: string | null;
  trainingPlanId: number | null;
}

interface UserAchievement {
  achievementId: number;
  description: string;
  name: string;
}

interface AchievementBadge {
  id: number;
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  date: string | null;
  color: string;
  earned: boolean;
}

interface TrainingPlan {
  trainingPlanId: number;
  planName: string;
  startDate: string;
  endDate: string;
  goalDistance: number;
  goalTime: number;
}

export type {
  StravaRun,
  TrainingSession,
  UserAchievement,
  AchievementBadge,
  TrainingPlan,
};
