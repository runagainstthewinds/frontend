import { useState } from "react";
import {
  Calendar,
  TrendingUp,
  History,
  ClipboardList,
  UserRound,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  useUserName,
  useUserInitials,
  useHasStravaToken,
  useUserEmail,
  useHasGoogleCalendarToken,
} from "@/hooks/useUserInfo";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function UserSidebar() {
  const [progress, setProgress] = useState(22);
  const [shoeUsage, setShoeUsage] = useState(75);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  return (
    <SidebarProvider>
      <Sidebar className="border-r w-64 shrink-0 overflow-y-auto">
        <SidebarHeader className="pb-0">
          <div className="flex flex-col items-center space-y-4 pt-4">
            <Avatar className="h-24 w-24 ring-2 ring-teal-600 ring-offset-4 ring-offset-teal-50/10 shadow-lg">
              <AvatarImage
                src="/placeholder.svg?height=96&width=96"
                alt="User"
              />
              <AvatarFallback className="bg-teal-600 text-white text-xl font-medium">
                {useUserInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold">{useUserName()}</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/profile">
                      <UserRound className="h-4 w-4" />
                      <span>Profile</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/dashboard">
                      <ClipboardList className="h-4 w-4" />
                      <span>Running Dashboard</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/history">
                      <History className="h-4 w-4" />
                      <span>History</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Connected Accounts</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-background p-3 shadow-sm border">
                  <div className="flex items-center space-x-3">
                    <div className="p-1.5 bg-muted rounded-md">
                      {useHasGoogleCalendarToken() ? (
                        <Calendar className="h-4 w-4 text-teal-600" />
                      ) : (
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      Google Calendar
                    </span>
                  </div>
                  {useHasGoogleCalendarToken() ? (
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      Connected
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                      Unconnected
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between rounded-lg bg-background p-3 shadow-sm border">
                  <div className="flex items-center space-x-3">
                    <div className="p-1.5 bg-muted rounded-md">
                      {useHasStravaToken() ? (
                        <Calendar className="h-4 w-4 text-teal-600" />
                      ) : (
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      Strava
                    </span>
                  </div>
                  {useHasStravaToken() ? (
                    <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                      Connected
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                      Unconnected
                    </Badge>
                  )}
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
