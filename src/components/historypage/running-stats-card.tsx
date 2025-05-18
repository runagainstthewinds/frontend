import { useEffect, useState } from "react";
import { getUserDetails } from "@/api/userDetails";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

function RunningStatsCard() {
  const [stats, setStats] = useState({
    totalDistance: 0,
    totalRuns: 0,
    totalTime: 0,
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // TODO: Replace with actual userId from your auth context/state
        const userId = "bf299756-4de6-4bc4-99d9-bd68daeb76ad";
        const userDetails = await getUserDetails(userId);
        setStats({
          totalDistance: userDetails.totalDistance,
          totalRuns: userDetails.runCount,
          totalTime: userDetails.totalDuration,
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

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
            <p className="text-2xl font-bold">{stats.totalDistance.toFixed(1)} km</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Runs</p>
            <p className="text-2xl font-bold">{stats.totalRuns}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Running Time</p>
            <p className="text-2xl font-bold">{(stats.totalTime / 60).toFixed(1)} h</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Average Distance</p>
            <p className="text-2xl font-bold">0.0 km</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <h3 className="font-Interval mb-2">Type Distribution</h3>
          <div className="flex gap-2">
            {["Recovery", "Interval", "Long Run"].map((type) => {
              const count = 0; // TODO: Get actual type distribution from API
              const percentage = 0;

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
                          ? "bg-blue-500"
                          : type === "Interval"
                            ? "bg-amber-500"
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
