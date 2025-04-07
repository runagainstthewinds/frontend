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
import JWTAuthTest from "./auth/jwtAuthTest";

export function UserSidebar() {
  const [progress, setProgress] = useState(22);
  const [shoeUsage, setShoeUsage] = useState(75);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  const getInitials = () => {
    if (!user || !user.username) return "?";
    return user.username.substring(0, 2).toUpperCase();
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
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold">{user?.username || "User"}</h2>
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
                    <div className="p-1.5 bg-teal-50 rounded-md">
                      <Calendar className="h-4 w-4 text-teal-600" />
                    </div>
                    <span className="text-sm font-medium">Google Calendar</span>
                  </div>
                  <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100">
                    Connected
                  </Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-background p-3 shadow-sm border">
                  <div className="flex items-center space-x-3">
                    <div className="p-1.5 bg-muted rounded-md">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      Strava
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-muted-foreground/30 text-muted-foreground"
                  >
                    Not Connected
                  </Badge>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Weekly Progress</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="rounded-lg bg-white p-4 shadow-sm border border-slate-200">
                <div className="flex justify-between text-sm mb-3">
                  <span className="font-medium text-slate-700">Distance</span>
                  <span className="font-semibold text-teal-800">25/40 km</span>
                </div>
                <Progress value={progress} className="h-2 bg-slate-100" />
                <div className="mt-3 text-xs text-slate-500 flex items-center justify-between">
                  <span>{progress}% of weekly goal</span>
                  <span className="text-teal-600 font-medium">
                    15 km remaining
                  </span>
                </div>
                <div className="flex justify-between text-sm my-3">
                  <span className="font-medium text-slate-700">Shoe Usage</span>
                  <span className="font-semibold text-teal-800">
                    <span>{shoeUsage}% used</span>
                  </span>
                </div>
                <Progress value={shoeUsage} className="h-2 bg-slate-100" />
                <div className="mt-3 text-xs text-slate-500 flex items-center justify-between">
                  <span>
                    Using
                    <span className="font-medium text-teal-600 underline">
                      {" "}
                      Nike Air Zoom Pegasus 38
                    </span>
                  </span>
                </div>
              </div>
            </SidebarGroupContent>

            <JWTAuthTest />
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
