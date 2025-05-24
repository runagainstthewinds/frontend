import { useEffect, useState } from "react";
import { getUserDetails } from "@/api/userDetails";
import { getTrainingSessions } from "@/api/trainingSession";
import { TrainingType } from "@/types/models";
import { useUserId } from "@/hooks/useUserInfo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

// Helper function to convert API string to TrainingType
const convertToTrainingType = (type: string): TrainingType => {
  switch (type) {
    case 'LONG_RUN':
      return TrainingType.LONG_RUN;
    case 'TEMPO':
      return TrainingType.TEMPO;
    case 'INTERVAL':
      return TrainingType.INTERVAL;
    case 'RECOVERY_RUN':
      return TrainingType.RECOVERY_RUN;
    default:
      return TrainingType.UNSPECIFIED;
  }
};

function RunningStatsCard() {
  const userId = useUserId();
  const [stats, setStats] = useState({
    totalDistance: 0,
    totalRuns: 0,
    totalTime: 0,
    weeklyDistance: 0,
  });

  const [typeDistribution, setTypeDistribution] = useState({
    Recovery: 0,
    Interval: 0,
    Tempo: 0,
    "Long Run": 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) {
          console.error("No user ID available");
          return;
        }
        
        // Fetch user details
        const userDetails = await getUserDetails(userId);
        
        // Fetch training sessions
        const trainingSessions = await getTrainingSessions(userId);
        
        // Calculate weekly distance
        const today = new Date();
        const lastMonday = new Date(today);
        lastMonday.setDate(today.getDate() - (today.getDay() + 6) % 7);
        lastMonday.setHours(0, 0, 0, 0);

        const weeklyDistance = trainingSessions
          .filter(session => 
            session.isComplete && 
            new Date(session.date) >= lastMonday && 
            new Date(session.date) <= today
          )
          .reduce((sum, session) => sum + session.achievedDistance, 0);

        // Calculate type distribution
        const completedSessions = trainingSessions.filter(session => session.isComplete);

        const distribution = {
          Recovery: completedSessions.filter(session => convertToTrainingType(session.trainingType) === TrainingType.RECOVERY_RUN).length,
          Interval: completedSessions.filter(session => convertToTrainingType(session.trainingType) === TrainingType.INTERVAL).length,
          Tempo: completedSessions.filter(session => convertToTrainingType(session.trainingType) === TrainingType.TEMPO).length,
          "Long Run": completedSessions.filter(session => convertToTrainingType(session.trainingType) === TrainingType.LONG_RUN).length,
        };

        setStats({
          totalDistance: userDetails.totalDistance,
          totalRuns: userDetails.runCount,
          totalTime: userDetails.totalDuration,
          weeklyDistance: weeklyDistance,
        });

        setTypeDistribution(distribution);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Running Statistics</CardTitle>
        <CardDescription>Your performance at a glance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Distance</p>
            <p className="text-2xl font-bold">
              {(stats.totalDistance ?? 0).toFixed(1)} km
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Runs</p>
            <p className="text-2xl font-bold">
              {stats.totalRuns ?? 0}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Running Time</p>
            <p className="text-2xl font-bold">
              {((stats.totalTime ?? 0) / 60).toFixed(1)} h
            </p> {/* Converted from minutes to hours */}
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Weekly Distance</p>
            <p className="text-2xl font-bold">
              {(stats.weeklyDistance ?? 0).toFixed(1)} km
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <h3 className="font-Interval mb-2">Type Distribution</h3>
          <div className="flex gap-2">
            {Object.entries(typeDistribution).map(([type, count]) => {
              const totalCompleted = Object.values(typeDistribution).reduce((sum, val) => sum + val, 0);
              const percentage = totalCompleted > 0 ? Math.round((count / totalCompleted) * 100) : 0;

              return (
                <div key={type} className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{type}</span>
                    <span>{percentage}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${
                        type === "Recovery"
                          ? "bg-green-500"
                          : type === "Interval"
                            ? "bg-blue-500"
                            : type === "Tempo"
                              ? "bg-orange-500"
                              : "bg-red-500"
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default RunningStatsCard;
