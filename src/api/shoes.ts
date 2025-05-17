import { Shoe } from "@/types/models";
import axios from "axios";

const api = axios.create({
  baseURL: "/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getShoes = async (userId: string): Promise<Shoe[]> => {
  try {
    const response = await api.get<Shoe[]>(`/shoes/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        withCredentials: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching shoes:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch shoes");
    }
    throw new Error("Failed to fetch shoes");
  }
};
