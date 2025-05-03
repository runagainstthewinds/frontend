"use client";

import { useState, useEffect } from "react";
import {
  AlertTriangle,
  Cloud,
  MapPin,
  Timer,
  TrendingUp,
  User,
  Wind,
  RotateCcw,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { UserSidebar } from "@/components/user-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import WeatherAlert from "@/components/ui/weatherAlert";
import { AddRunSessionModal } from "@/components/running-session-modal";
import { useUnit } from "@/context/UnitContext";
import { kmToMiles, paceConverter } from "@/lib/utils";

export default function RunningSessionPage() {
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(62.5);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
      },
    },
  };

  const { distanceUnit, paceUnit } = useUnit(); // Assuming you have a context or hook for units
  return (
    <SidebarProvider>
      <div className="flex min-h-screen min-w-screen bg-gray-50">
        <div className="md:w-64 md:shrink-0 md:sticky md:top-0 md:h-screen bg-white">
          <UserSidebar />
        </div>
        <SidebarInset>
          {/* Main Content */}
          <motion.div
            className="flex-1 p-6 bg-white min-h-screen overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="">
              <div className="flex items-center mb-6">
                <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between gap-x-4 border-b bg-background px-6">
                  <div className="flex items-center gap-x-4">
                    <SidebarTrigger />
                    <h1 className="text-xl font-semibold">Running Dashboard</h1>
                  </div>
                  <Button className="flex items-center bg-teal-600 hover:bg-teal-700 transition group">
                    Latest from Strava
                    <RotateCcw className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-rotate-90" />
                  </Button>
                </header>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <WeatherAlert />
                </motion.div>

                <motion.div variants={itemVariants} className="mb-4">
                  <Card className="shadow-lg">
                    <CardHeader className="border-b py-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-slate-900 text-xl">
                            Endurance Training
                          </CardTitle>
                          <CardDescription className="text-slate-600 mt-1">
                            Tomorrow, 7:00 AM • Central Park Loop
                          </CardDescription>
                        </div>
                        <Badge className="bg-teal-600 hover:bg-teal-700 py-1.5">
                          Scheduled
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4 pb-4 space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                          { icon: MapPin, title: "Route", value: "Trail" },
                          {
                            icon: Cloud,
                            title: "Weather",
                            value: "18°C Cloudy",
                          },
                          { icon: Wind, title: "Wind", value: "5 km/h NE" }, // change to mph?
                          {
                            icon: TrendingUp,
                            title: "Distance",
                            value: "12 km", // TODO: Convert to miles when we have the actual data
                          },
                          {
                            icon: Timer,
                            title: "Pace",
                            value: "5:30 min/km", // TODO: same as above
                          },
                          { icon: User, title: "Partner", value: "Solo" },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg border border-slate-100"
                          >
                            <div className="p-1.5 bg-white rounded-md shadow-sm">
                              <item.icon className="h-4 w-4 text-teal-600" />
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 font-medium">
                                {item.title}
                              </p>
                              <p className="font-medium text-slate-900">
                                {item.value}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <h3 className="text-sm font-medium text-slate-900">
                          Training Notes
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Focus on maintaining consistent pace. Hydrate well and
                          monitor heart rate zones. Allow for 5-minute warm-up
                          and cool-down periods.
                        </p>
                      </div>

                      <div className="flex gap-3 pt-1">
                        <AddRunSessionModal
                          open={isCompleteModalOpen}
                          onOpenChange={setIsCompleteModalOpen}
                          trigger={
                            <Button className="bg-teal-600 hover:bg-teal-700 px-4 py-2 font-medium cursor-pointer">
                              Complete Session
                            </Button>
                          }
                        />
                        <Button
                          variant="outline"
                          className="text-red-400 border-red-300 hover:bg-red-50 px-4 py-2 cursor-pointer"
                        >
                          Cancel Session
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="shadow-lg overflow-hidden">
                    <CardHeader className="border-b py-5">
                      <CardTitle className="text-slate-900">
                        Training Schedule
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="">
                      {[
                        {
                          day: "Monday",
                          type: "Rest",
                          detail: "Active recovery",
                          badge: "bg-purple-100 text-purple-800",
                        },
                        {
                          day: "Tuesday",
                          type: "Intervals",
                          detail: "5 km speed work",
                          badge: "bg-teal-100 text-teal-800",
                        },
                        {
                          day: "Wednesday",
                          type: "Easy Run",
                          detail: "6 km recovery",
                          badge: "bg-green-100 text-green-800",
                        },
                        {
                          day: "Saturday",
                          type: "Long Run",
                          detail: "12 km endurance",
                          badge: "bg-blue-100 text-blue-800",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0"
                        >
                          <div>
                            <p className="font-medium text-slate-900">
                              {item.day}
                            </p>
                            <p className="text-sm text-slate-600 mt-0.5">
                              {item.detail}
                            </p>
                          </div>
                          <Badge className={`${item.badge} px-3 py-1`}>
                            {item.type}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
