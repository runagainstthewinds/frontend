import React, { useState } from "react";
import { Button } from "./button";
import { ExternalLink } from "lucide-react";
import { connectToStrava } from "@/api/strava";

interface StravaConnectButtonProps {
  username: string;
  className?: string;
}

/**
 * Strava connect button that opens authentication in a new window
 * Uses the connectToStrava API service method
 */
const StravaConnectButton: React.FC<StravaConnectButtonProps> = ({
  username,
  className = "",
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnectStrava = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please login again.");
        return;
      }

      localStorage.setItem("strava_flow_initiated", "true");

      const expiresAt = Date.now() + 10 * 60 * 1000;
      localStorage.setItem("strava_flow_expires", expiresAt.toString());

      await connectToStrava(username, token);
    } catch (error) {
      console.error("Error connecting to Strava:", error);
      const message = error instanceof Error ? error.message : String(error);
      if (message.includes("403") || message.includes("Authentication")) {
        setError("Authentication error. Your session may have expired.");
      } else if (message.includes("Network")) {
        setError(
          "Network error. Check your connection or backend server status.",
        );
      } else {
        setError(`Error: ${message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        variant="outline"
        size="sm"
        className={`border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100 hover:text-orange-800 ${className}`}
        onClick={handleConnectStrava}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-orange-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Connecting...
          </>
        ) : (
          <>
            <ExternalLink className="h-4 w-4 mr-2" />
            Connect
          </>
        )}
      </Button>

      {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
    </div>
  );
};

export default StravaConnectButton;
