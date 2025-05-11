import axios from "axios";
import { TrainingPlan } from "../types/models";

interface CreateTrainingPlanParams {
  planName: string;
  startDate: string;
  endDate: string;
  goalDistance: number;
  difficulty: string;
}

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

export const createTrainingPlan = async (
  userId: string,
  plan: CreateTrainingPlanParams
): Promise<TrainingPlan> => {
  console.log("Creating training plan for user:", userId);
  console.log("Plan data:", plan);
  
  try {
    const response = await api.post<TrainingPlan>(
      `/trainingplans/${userId}`,
      plan,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          withCredentials: true,
        },
      }
    );
    console.log("Training plan created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating training plan:", error);
    if (axios.isAxiosError(error)) {
      console.error("API Error Details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers
      });
      throw new Error(
        error.response?.data?.message || "Failed to create training plan"
      );
    }
    throw new Error("Failed to create training plan");
  }
};
