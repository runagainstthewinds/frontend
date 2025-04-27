import { Card } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  PencilIcon,
  MailIcon,
  Bike,
  FlagIcon,
  Footprints,
  MapIcon,
  Calendar,
  Check,
  ExternalLink,
} from "lucide-react";
import {
  getUserEmail,
  getUserInitials,
  getUserName,
  hasGoogleCalendarToken,
  hasStravaToken,
} from "@/helper/getUserDetails";
import { h } from "node_modules/framer-motion/dist/types.d-B50aGbjN";

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
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>

          {/* User info with proper spacing on mobile */}
          <div className="flex-1 space-y-2 mt-16 md:mt-0 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-2xl font-bold">{getUserName()}</h2>
              <Button size="sm" variant="outline" className="self-start">
                <PencilIcon className="h-4 w-4 mr-1" />
                Edit Profile
              </Button>
            </div>
            <p className="text-muted-foreground flex items-center">
              <MailIcon className="h-4 w-4 mr-1.5 text-muted-foreground/70" />
              {getUserEmail()}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge
                variant="outline"
                className="bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-200 px-3 py-1"
              >
                <Footprints className="h-3 w-3 mr-1" />
                Runner
              </Badge>
              <Badge
                variant="outline"
                className="bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-200 px-3 py-1"
              >
                <FlagIcon className="h-3 w-3 mr-1" />
                Marathon
              </Badge>
              <Badge
                variant="outline"
                className="bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-200 px-3 py-1"
              >
                <MapIcon className="h-3 w-3 mr-1" />
                Trail
              </Badge>
            </div>
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
            {hasGoogleCalendarToken() ? (
              <Button
                variant="outline"
                size="sm"
                className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
              >
                <Check className="h-4 w-4 mr-2" />
                Connected
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Connect
              </Button>
            )}
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
            {hasStravaToken() ? (
              <Button
                variant="outline"
                size="sm"
                className="border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100 hover:text-orange-800"
              >
                <Check className="h-4 w-4 mr-2" />
                Connected
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100 hover:text-orange-800"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Connect
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default UserOverview;
