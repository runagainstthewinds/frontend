import api from "./client";
import axios from "axios";
import {
  RegisterResponse,
  LoginCredentials,
  RegisterCredentials,
} from "../types/auth";

export const login = async (credentials: LoginCredentials): Promise<string> => {
  try {
    const response = await api.post<string>(`/auth/login`, credentials);
    const token = response.data;
    if (token) {
      localStorage.setItem("token", token);
    }

    return token;
  } catch (error) {
    console.error("Login error:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
    throw new Error("Login failed");
  }
};

export const register = async (
  credentials: RegisterCredentials,
): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>(
      `/auth/register`,
      credentials,
    );
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.error === "Username already exists") {
        throw new Error(
          "Username already exists. Please choose a different username.",
        );
      }
      throw new Error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Registration failed",
      );
    }
    throw new Error("Registration failed");
  }
};

export const logout = async (): Promise<void> => {
  try {
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export const setAuthToken = (token: string | null): void => {
  if (token) {
    console.log("Setting auth token in API headers");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    console.log("Removing auth token from API headers");
    delete api.defaults.headers.common["Authorization"];
  }
};

export const setupAuthFromStorage = (): void => {
  const token = localStorage.getItem("token");
  if (token) {
    console.log("Restoring auth token from storage");
    setAuthToken(token);
  } else {
    console.log("No auth token found in storage");
  }
};

export const testAuthEndpoint = async (): Promise<any> => {
  try {
    console.log(
      "Current Authorization header:",
      api.defaults.headers.common["Authorization"],
    );

    const response = await api.get("/example");
    return response.data;
  } catch (error) {
    console.error("Auth test error:", error);
    throw error;
  }
};
