import axios from "axios";
import { ShoeResponse } from "@/types/models";
import { AddShoeFormData  } from "@/types/form";

const api = axios.create({
  baseURL: "/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getShoeCollection = async (
  userId: string
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
}

export const addShoeToCollection = async (
  userId: string,
  shoe: AddShoeFormData
) : Promise<AddShoeFormData> => {
  try {
    const response = await api.post<AddShoeFormData>(
      `/shoes/${userId}`,
      shoe,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          withCredentials: true,
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding a shoe:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to add a shoe",
      );
    }
    throw new Error("Failed to add a shoe");
  }
};
