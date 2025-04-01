import {
  Calendar,
  Check,
  Edit,
  ExternalLink,
  BikeIcon as Strava,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserSidebar } from "@/components/user-sidebar";
import { MonthlyMileageChart } from "@/components/monthly-mileage-chart";
import { ShoeCollection } from "@/components/shoe-collection";
import { AchievementBadges } from "@/components/achievement-badges";
import { UserProfileForm } from "@/components/user-profile-form";

export default function UserProfile() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen min-w-screen bg-gray-50">
        <div className="md:w-64 md:shrink-0 md:sticky md:top-0 md:h-screen bg-white">
          <UserSidebar />
        </div>
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">Profile</h1>
          </header>
          <main className="flex-1 p-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="overview" className="text-gray-800">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="shoes" className="text-gray-800">
                  Shoes
                </TabsTrigger>
                <TabsTrigger value="achievements" className="text-gray-800">
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="settings" className="text-gray-800">
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <UserOverview />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <StatisticsCard />
                  <IntegrationsCard />
                </div>
                <MonthlyMileageCard />
              </TabsContent>

              <TabsContent value="shoes">
                <ShoeCollection />
              </TabsContent>

              <TabsContent value="achievements">
                <AchievementBadges />
              </TabsContent>

              <TabsContent value="settings">
                <UserProfileForm />
              </TabsContent>
            </Tabs>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function UserOverview() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
            <AvatarFallback className="bg-teal-600 text-white text-xl font-medium">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">John Doe</h2>
            </div>
            <p className="text-muted-foreground">john.doe@example.com</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge
                variant="outline"
                className="bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-200"
              >
                Runner
              </Badge>
              <Badge
                variant="outline"
                className="bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-200"
              >
                Marathon
              </Badge>
              <Badge
                variant="outline"
                className="bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-200"
              >
                Trail
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatisticsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Statistics</CardTitle>
        <CardDescription>Your running journey at a glance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Runs</p>
            <p className="text-2xl font-bold">124</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Distance</p>
            <p className="text-2xl font-bold">1,248 km</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Running Time</p>
            <p className="text-2xl font-bold">21 hours</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Elevation Gain</p>
            <p className="text-2xl font-bold">12,540 m</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Weekly Goal</span>
            <span className="font-semibold text-gray-800">25/40 km</span>
          </div>
          <Progress value={62.5} className="h-2 bg-slate-100" />
          <div className="text-xs text-slate-500 flex items-center justify-between">
            <span>62.5% of weekly goal</span>
            <span className="text-teal-600 font-medium">15 km remaining</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function IntegrationsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
        <CardDescription>Connect your accounts to sync data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">Google Calendar</p>
              <p className="text-sm text-muted-foreground">
                Schedule your runs
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
          >
            <Check className="h-4 w-4 mr-2" />
            Connected
          </Button>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100">
              <Strava className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="font-medium">Strava</p>
              <p className="text-sm text-muted-foreground">
                Sync your activities
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100 hover:text-orange-800"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Connect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function MonthlyMileageCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Mileage</CardTitle>
        <CardDescription>Track your running consistency</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <MonthlyMileageChart />
        </div>
      </CardContent>
    </Card>
  );
}
