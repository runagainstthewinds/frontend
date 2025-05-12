import { TrainingPlan, TrainingSession } from "@/types/models";
import { getCurrentTrainingPlan } from "@/api/trainingPlan";
import { getTrainingSessionsForPlan } from "@/api/trainingSession";

export interface TrainingData {
  plan: TrainingPlan | null;
  sessions: TrainingSession[];
}

/**
 * Fetches the current training plan and its associated sessions for a user
 * @param userId The ID of the user
 * @returns An object containing the training plan and its sessions
 */
export const fetchTrainingPlanAndSessions = async (userId: string): Promise<TrainingData> => {
  try {
    const plan = await getCurrentTrainingPlan(userId);
    let sessions: TrainingSession[] = [];
    
    if (plan?.trainingPlanId) {
      sessions = await getTrainingSessionsForPlan(plan.trainingPlanId.toString());
      sessions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    
    return { plan, sessions };
  } catch (error) {
    console.error("Error fetching training data:", error);
    return { plan: null, sessions: [] };
  }
}; 