import axios from "axios";
import { ShoeRequest, ShoeResponse } from "@/types/models";

const api = axios.create({
  baseURL: "/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getShoeCollection = async (
  userId: string,
): Promise<ShoeResponse[]> => {
  try {
    const response = await api.get<ShoeResponse[]>(`/shoes/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        withCredentials: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching shoe collection:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch shoe collection",
      );
    }
    throw new Error("Failed to fetch shoe collection");
  }
};

export const addShoeToCollection = async (
  userId: string,
  shoe: ShoeRequest,
): Promise<ShoeRequest> => {
  try {
    const response = await api.post<ShoeRequest>(`/shoes/${userId}`, shoe, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        withCredentials: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding a shoe:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to add a shoe");
    }
    throw new Error("Failed to add a shoe");
  }
};
