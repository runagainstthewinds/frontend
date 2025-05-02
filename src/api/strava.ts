import axios from "axios";

const api = axios.create({
  baseURL: "/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export interface StravaAuthUrlResponse {
  url:
    | string
    | {
        href?: string;
        protocol?: string;
        host?: string;
        pathname?: string;
        search?: string;
        [key: string]: any;
      };
}

export interface StravaCallbackResponse {
  athleteId: number;
  message: string;
  athleteName: string;
  status: string;
  username: string;
}

/**
 * Gets the Strava authentication URL for the user
 * @param username - The username to associate with the Strava connection
 * @param token - The auth token for the API request
 * @returns Promise containing the Strava auth URL
 */
export const getStravaAuthUrl = async (
  username: string,
  token: string,
): Promise<string> => {
  try {
    const response = await api.get<StravaAuthUrlResponse>(
      `/api/strava/auth-url?username=${encodeURIComponent(username)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.data.url) {
      throw new Error("Something went wrong");
    }

    if (typeof response.data.url === "string") {
      return response.data.url;
    } else if (typeof response.data.url === "object") {
      const urlObj = response.data.url as {
        href?: string;
        protocol?: string;
        host?: string;
        pathname?: string;
        search?: string;
      };

      if (urlObj.href) {
        return urlObj.href;
      }

      if (urlObj.protocol && urlObj.host) {
        return `${urlObj.protocol}//${urlObj.host}${urlObj.pathname || ""}${urlObj.search || ""}`;
      }

      const stringUrl = String(response.data.url);
      if (stringUrl === "[object Object]") {
        throw new Error("Something went wrong");
      }
      return stringUrl;
    }

    throw new Error(`Invalid URL format: ${JSON.stringify(response.data.url)}`);
  } catch (error) {
    console.error("Error fetching Strava auth URL:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Something went wrong",
      );
    }
    throw new Error("Something went wrong");
  }
};

/**
 * Opens the Strava authentication page in a new window
 * @param username - The username to associate with the Strava connection
 * @param token - The auth token for the API request
 * @returns Promise that resolves when the new window is opened
 */
export const connectToStrava = async (
  username: string,
  token: string,
): Promise<void> => {
  try {
    const authUrlStr = await getStravaAuthUrl(username, token);

    window.open(authUrlStr, "_blank", "noopener,noreferrer");
  } catch (error) {
    console.error("Error connecting to Strava:", error);
    throw error;
  }
};
