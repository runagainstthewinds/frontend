import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface StravaGuardProps {
  children: React.ReactNode;
}

const StravaRouteGuard: React.FC<StravaGuardProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const flowInitiated = localStorage.getItem("strava_flow_initiated");
    const expiresAtStr = localStorage.getItem("strava_flow_expires");

    if (!flowInitiated || !expiresAtStr) {
      navigate("/dashboard");
      return;
    }

    const expiresAt = parseInt(expiresAtStr, 10);
    if (Date.now() > expiresAt) {
      localStorage.removeItem("strava_flow_initiated");
      localStorage.removeItem("strava_flow_expires");
      navigate("/dashboard");
      return;
    }
  }, [navigate]);

  return <>{children}</>;
};

export default StravaRouteGuard;
