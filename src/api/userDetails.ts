import axios from "axios";
import { UserDetails } from "../types/models";

const api = axios.create({
  baseURL: "/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Get user details for a specific user ID.
 */
export const getUserDetails = async (userId: string): Promise<UserDetails> => {
  try {
    const response = await api.get<UserDetails>(`/userdetails/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        withCredentials: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch user details"
      );
    }
    throw new Error("Failed to fetch user details");
  }
};

/**
 * Update user details for a specific user ID.
 */
export const updateUserDetails = async (
  userId: string,
  userDetails: Partial<UserDetails>
): Promise<UserDetails> => {
  try {
    const response = await api.put<UserDetails>(
      `/userdetails/${userId}`,
      userDetails,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          withCredentials: true,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user details:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to update user details"
      );
    }
    throw new Error("Failed to update user details");
  }
}; 