import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserSidebar } from "@/components/user-sidebar";
import { ShoeCollection } from "@/components/profilepage/shoe-collection";
import { AchievementBadges } from "@/components/profilepage/achievement-badges";
import { UserProfileForm } from "@/components/profilepage/user-profile-form";
import UserOverview from "@/components/profilepage/user-overview";

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
                <TabsTrigger value="achievements" className="text-gray-800">
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="settings" className="text-gray-800">
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-10">
                <UserOverview />
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
