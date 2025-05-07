import axios from "axios";
import { TrainingPlan } from "../types/models";

const api = axios.create({
  baseURL: "/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getTrainingPlans = async (
  userId: string,
): Promise<TrainingPlan[]> => {
  try {
    const response = await api.get<TrainingPlan[]>(`/trainingplans/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        withCredentials: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching training plans:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch training plans",
      );
    }
    throw new Error("Failed to fetch training plans");
  }
};

export const getCurrentTrainingPlan = async (
  userId: string,
): Promise<TrainingPlan> => {
  try {
    const response = await api.get<TrainingPlan>(
      `/trainingplans/current/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          withCredentials: true,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching current training plan:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch current training plan",
      );
    }
    throw new Error("Failed to fetch current training plan");
  }
};
