import { Card } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  PencilIcon,
  MailIcon,
  Bike,
  Calendar,
  Check,
  ExternalLink,
} from "lucide-react";

import {
  useUserName,
  useUserInitials,
  useHasStravaToken,
  useUserEmail,
  useHasGoogleCalendarToken,
} from "@/hooks/useUserInfo";
import StravaConnectButton from "../ui/StravaConnectButton";

function UserOverview() {
  return (
    <Card className="overflow-hidden py-0">
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 h-24" />

      <div className="px-6 pb-6">
        {/* Profile section with avatar overlapping the header */}
        <div className="flex flex-col md:flex-row gap-6 items-start relative">
          <Avatar className="h-24 w-24 border-4 border-white shadow-lg absolute top-0 transform -translate-y-1/2 md:relative md:transform-none">
            <AvatarImage
              src="/placeholder.svg?height=96&width=96"
              alt="Avatar Image"
            />
            <AvatarFallback className="bg-teal-600 text-white text-xl font-medium">
              {useUserInitials()}
            </AvatarFallback>
          </Avatar>

          {/* User info with proper spacing on mobile */}
          <div className="flex-1 space-y-2 mt-16 md:mt-0 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-2xl font-bold">{useUserName()}</h2>
            </div>
            <p className="text-muted-foreground flex items-center">
              <MailIcon className="h-4 w-4 mr-1.5 text-muted-foreground/70" />
              {useUserEmail()}
            </p>
          </div>
        </div>

        {/* Connected apps section with title */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Connected Apps</h3>

          <div className="flex items-center justify-between p-4 rounded-lg border hover:border-teal-300 hover:bg-teal-50/30 transition-colors">
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
            <div>
              <span className="inline-block px-3 py-1 text-xs font-normal text-blue-700 bg-blue-100 rounded-sm border border-blue-200 shadow-sm">
                Coming Soon
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border hover:border-orange-300 hover:bg-orange-50/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100">
                <Bike className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="font-medium">Strava</p>
                <p className="text-sm text-muted-foreground">
                  Sync your activities
                </p>
              </div>
            </div>
            {useHasStravaToken() ? (
              <Button
                variant="outline"
                size="sm"
                className="border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100 hover:text-orange-800"
              >
                <Check className="h-4 w-4 mr-2" />
                Connected
              </Button>
            ) : (
              <StravaConnectButton username={useUserName()} />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default UserOverview;
