import axios from "axios";
import { TrainingSession } from "../types/models";

const api = axios.create({
  baseURL: "/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getTrainingSessions = async (
  userId: string,
): Promise<TrainingSession[]> => {
  try {
    const response = await api.get<TrainingSession[]>(
      `/trainingsessions/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          withCredentials: true,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching training sessions:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch training sessions",
      );
    }
    throw new Error("Failed to fetch training sessions");
  }
};

export const getTrainingSessionsForPlan = async (planId: string) => {
  try {
    const response = await api.get<TrainingSession[]>(
      `/trainingsessions/trainingplans/${planId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          withCredentials: true,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching training sessions for plan:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch training sessions for plan",
      );
    }
    throw new Error("Failed to fetch training sessions for plan");
  }
};

/**
 * Create a new training session for a given user.
 */
export const createTrainingSession = async (
  userId: string,
  session: TrainingSession,
): Promise<TrainingSession> => {
  try {
    const response = await api.post<TrainingSession>(
      `/trainingsessions/users/${userId}`,
      session,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating training session:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to create training session",
      );
    }
    throw new Error("Failed to create training session");
  }
};

/**
 * Update an existing training session by its ID.
 */
export const updateTrainingSession = async (
  trainingSessionId: string,
  session: Partial<TrainingSession>,
): Promise<TrainingSession> => {
  try {
    const response = await api.put<TrainingSession>(
      `/trainingsessions/${trainingSessionId}`,
      session,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          withCredentials: true,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error updating training session:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to update training session",
      );
    }
    throw new Error("Failed to update training session");
  }
};
