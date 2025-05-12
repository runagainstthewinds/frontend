import axios from "axios";
import { Shoe } from "../types/models";

const api = axios.create({
  baseURL: "/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getShoeByUserId = async (userId: string): Promise<Shoe[]> => {
  console.log(`[API] Fetching shoes for user ${userId}`);
  console.log("[API] Request details:", {
    url: `/shoes/${userId}`,
    method: "GET",
    headers: {
      Authorization: "Bearer [REDACTED]",
      withCredentials: true,
    },
    userIdType: typeof userId,
    userIdLength: userId.length,
    isUUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId)
  });

  try {
    const response = await api.get<Shoe[]>(`/shoes/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        withCredentials: true,
      },
    });
    
    console.log("[API] Response received:", {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
    });
    
    return response.data;
  } catch (error) {
    console.error("[API] Error fetching shoes:", {
      error,
      message: error instanceof Error ? error.message : "Unknown error",
      response: axios.isAxiosError(error) ? {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers,
        }
      } : undefined,
    });

    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch shoes"
      );
    }
    throw new Error("Failed to fetch shoes");
  }
};
