import { useAuth } from "@/context/AuthContext";

export function useUserName(): string {
  const { user } = useAuth();
  return user?.username ?? "Guest";
}

export function useUserInitials(): string {
  const { user } = useAuth();
  if (!user?.username) return "?";
  return user.username.slice(0, 2).toUpperCase();
}

export function useUserEmail(): string {
  const { user } = useAuth();
  return user?.email ?? "No email provided";
}

export function useUserId(): string {
  const { user } = useAuth();
  return user?.userId ?? "";
}

export function useHasStravaToken(): boolean {
  const { user } = useAuth();
  return Boolean(user?.stravaToken);
}

export function useHasGoogleCalendarToken(): boolean {
  const { user } = useAuth();
  return Boolean(user?.googleCalendarToken);
}
