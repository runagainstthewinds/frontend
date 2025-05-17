"use client";

import { useState, useEffect, useMemo } from "react";
import { Timer, TrendingUp, Clock9 } from "lucide-react";
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
import { AddRunSessionModal } from "@/components/form/running-session/running-session-modal";
import { TrainingSession, TrainingPlan } from "@/types/models";
import { getCurrentTrainingPlan } from "@/api/trainingPlan";
import { getTrainingSessionsForPlan } from "@/api/trainingSession";
import { useUserId } from "@/hooks/useUserInfo";
import { mapResponseToRunType } from "@/helper/mapTrainingType";
import { TrainingPlanModal } from "@/components/form/running-plan/running-plan-modal";

export default function RunningSessionPage() {
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [trainingPlan, setTrainingPlan] = useState<TrainingPlan | null>(null);
  const [trainingSessions, setTrainingSessions] = useState<TrainingSession[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const userId = useUserId();

  const fetchTrainingPlanData = async () => {
    if (!userId) return;
    setLoading(true);

    try {
      const plan = await getCurrentTrainingPlan(userId);
      setTrainingPlan(plan);
      
      if (plan?.trainingPlanId) {
        const sessions = await getTrainingSessionsForPlan(plan.trainingPlanId.toString());
        const sortedSessions = sessions.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        setTrainingSessions(sortedSessions);
      } else {
        setTrainingSessions([]);
      }
    } catch (error) {
      console.error("Error fetching training data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainingPlanData();
  }, [userId]);

  // Determine the next upcoming session
  const nextSession = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = trainingSessions
      .filter((s) => {
        const sessionDate = new Date(s.date + "T00:00:00");
        sessionDate.setHours(0, 0, 0, 0);
        return sessionDate >= today;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return upcoming[0];
  }, [trainingSessions]);

  const formatSessionDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return new Date(date).toLocaleString(undefined, {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

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

  if (loading) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen min-w-screen items-center justify-center">
          <p>Loading...</p>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen min-w-screen bg-gray-50">
        <div className="md:w-64 md:shrink-0 md:sticky md:top-0 md:h-screen bg-white">
          <UserSidebar />
        </div>
        <SidebarInset>
          <motion.div
            className="flex-1 p-6 bg-white min-h-screen overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div>
              <div className="flex items-center mb-6">
                <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between gap-x-4 border-b bg-background px-6">
                  <div className="flex items-center gap-x-4">
                    <SidebarTrigger />
                    <h1 className="text-xl font-semibold">Running Dashboard</h1>
                  </div>
                  <TrainingPlanModal
                    open={isPlanModalOpen}
                    onOpenChange={setIsPlanModalOpen}
                    onSubmit={() => fetchTrainingPlanData()}
                  />
                </header>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} className="mb-4">
                  <WeatherAlert />
                </motion.div>

                <motion.div variants={itemVariants} className="mb-4">
                  <Card className="shadow-lg">
                    <CardHeader className="border-b py-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-slate-900 text-xl">
                            {trainingPlan?.planName || "Training Plan"}
                          </CardTitle>
                          <CardDescription className="text-slate-600 mt-1">
                            {nextSession
                              ? formatSessionDate(nextSession.date.toString())
                              : "No upcoming sessions"}
                          </CardDescription>
                        </div>
                        {nextSession && (
                          <Badge
                            className={`${
                              nextSession.isComplete
                                ? "bg-green-100 text-green-800"
                                : "bg-teal-600 hover:bg-teal-700 text-white"
                            } py-1.5`}
                          >
                            {nextSession.isComplete ? "Completed" : "Scheduled"}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    {nextSession && (
                      <CardContent className="pt-4 pb-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {[
                            {
                              icon: TrendingUp,
                              title: "Distance",
                              value: `${nextSession.distance} km`,
                            },
                            {
                              icon: Timer,
                              title: "Goal Pace",
                              value: `${nextSession.pace} min/km`,
                            },
                            {
                              icon: Clock9,
                              title: "Duration",
                              value: `${nextSession.duration} min`,
                            },
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

                        {nextSession.notes && (
                          <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <h3 className="text-sm font-medium text-slate-900">
                              Training Notes
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              {nextSession.notes}
                            </p>
                          </div>
                        )}

                        <div className="flex gap-3 pt-1">
                          <AddRunSessionModal
                            open={isCompleteModalOpen}
                            onOpenChange={setIsCompleteModalOpen}
                            sessionId={nextSession?.trainingSessionId}
                            onSubmit={fetchTrainingPlanData}
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
                    )}
                  </Card>
                </motion.div>

                {/* Schedule Card */}
                <motion.div variants={itemVariants}>
                  <Card className="shadow-lg overflow-hidden">
                    <CardHeader className="border-b py-5">
                      <CardTitle className="text-slate-900">
                        Training Schedule
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {trainingSessions.length === 0 && (
                        <p className="text-slate-600">
                          No training sessions scheduled.
                        </p>
                      )}

                      {trainingSessions.map((session) => (
                        <div
                          key={session.trainingSessionId}
                          className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0"
                        >
                          <div>
                            <p className="font-medium text-slate-900">
                              {formatSessionDate(session.date.toString())}
                            </p>
                            <p className="text-sm text-slate-600 mt-0.5">
                              {session.distance.toFixed(2)} km • {session.pace.toFixed(2)} min/km
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              className="bg-slate-100 text-slate-800 px-3 py-1"
                            >
                              {mapResponseToRunType(session.trainingType)}
                            </Badge>
                            <Badge
                              className={`${
                                session.isComplete
                                  ? "bg-green-100 text-green-800"
                                  : "bg-teal-100 text-teal-800"
                              } px-3 py-1`}
                            >
                              {session.isComplete ? "Completed" : "Scheduled"}
                            </Badge>
                          </div>
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
