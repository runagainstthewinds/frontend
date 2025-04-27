import { useAuth } from "@/context/AuthContext";

function getUserName(): string {
  const { user } = useAuth();
  if (!user) return "Guest";
  return user.username;
}

function getUserInitials(): string {
  const { user } = useAuth();
  if (!user || !user.username) return "?";
  return user.username.substring(0, 2).toUpperCase();
}

function getUserEmail(): string {
  const { user } = useAuth();
  if (!user || !user.email) return "No email provided";
  return user.email;
}

function getUserId(): string {
  const { user } = useAuth();
  if (!user) return "No user ID provided";
  return user.userId;
}

function hasStravaToken(): boolean {
  const { user } = useAuth();
  if (!user || !user.stravaToken) return false;
  return true;
}

function hasGoogleCalendarToken(): boolean {
  const { user } = useAuth();
  if (!user || !user.googleCalendarToken) return false;
  return true;
}

export {
  getUserName,
  getUserInitials,
  getUserEmail,
  getUserId,
  hasStravaToken,
  hasGoogleCalendarToken,
};
