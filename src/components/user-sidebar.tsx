"use client";

import * as React from "react";
import { Calendar, Home, TrendingUp } from "lucide-react";

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

import GoogleCalendarConnect from "./ui/GoogleCalendarConnect";
import { GoogleOAuthProvider } from "@react-oauth/google";

export function UserSidebar() {
  const [progress, setProgress] = React.useState(62);

  return (
    <SidebarProvider>
      <Sidebar className="border-r w-64 shrink-0 md:h-screen overflow-y-auto">
        <SidebarHeader className="pb-0">
          <div className="flex flex-col items-center space-y-4 pt-4">
            <Avatar className="h-24 w-24 ring-2 ring-teal-600 ring-offset-4 ring-offset-teal-50/10 shadow-lg">
              <AvatarImage
                src="/placeholder.svg?height=96&width=96"
                alt="User"
              />
              <AvatarFallback className="bg-teal-600 text-white text-xl font-medium">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="text-xl font-bold">John Doe</h2>
              <a
                href="/achievements"
                className="text-teal-600 text-sm font-medium hover:underline"
              >
                View Achievements
              </a>
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
                    <a href="/home">
                      <Home className="h-4 w-4" />
                      <span>Home</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/statistics">
                      <TrendingUp className="h-4 w-4" />
                      <span>View Statistics</span>
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
                    <GoogleOAuthProvider
                      clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}
                    >
                      <GoogleCalendarConnect />
                    </GoogleOAuthProvider>
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
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
