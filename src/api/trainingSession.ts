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

/**
 * Fetch all training sessions for a given user.
 */
export const getTrainingSessions = async (
  userId: string,
): Promise<TrainingSession[]> => {
  try {
    const response = await api.get<TrainingSession[]>(
      `/trainingsessions/${userId}`,
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

/**
 * Create a new training session for a given user.
 */
export const createTrainingSession = async (
  userId: string,
  session: TrainingSession,
): Promise<TrainingSession> => {
  try {
    const response = await api.post<TrainingSession>(
      `/trainingsessions/${userId}`,
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
