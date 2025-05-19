"use client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserSidebar } from "@/components/user-sidebar";
import RunningStatsCard from "@/components/historypage/running-stats-card";
import MonthlyMileageCard from "@/components/historypage/monthly-mileage-card";
import RunHistoryCard from "@/components/historypage/run-history-card";

function HistoryPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen min-w-screen bg-gray-50">
        <div className="md:w-64 md:shrink-0 md:sticky md:top-0 md:h-screen bg-white">
          <UserSidebar />
        </div>
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">History</h1>
          </header>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <MonthlyMileageCard />
              <RunningStatsCard />
            </div>
            <RunHistoryCard />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default HistoryPage;
