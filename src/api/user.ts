import axios from "axios";
import { User } from "../types/auth";
import { UserAchievement } from "../types/models";

async function getUserByUsername(username: string): Promise<User> {
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

async function getUserAchievements(
  user_id: string,
): Promise<UserAchievement[]> {
  return axios
    .get<UserAchievement[]>(`/achievements/${user_id}`, {
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

export { getUserByUsername, getUserAchievements };
