import axios from "axios";
import { User } from "../types/auth";

async function getUserByUsername(username: String): Promise<User> {
  return axios
    .get<User>(`/users/${username}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        withCredentials: true,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching user:", error);
      throw new Error("Failed to fetch user data");
    });
}

export default getUserByUsername;
