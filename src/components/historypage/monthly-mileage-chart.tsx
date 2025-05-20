"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { getTrainingSessions } from "@/api/trainingSession";
import { TrainingSession } from "@/types/models";
import { useUserId } from "@/hooks/useUserInfo";

interface MonthlyData {
  month: string;
  distance: number;
}

export function MonthlyMileageChart() {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const userId = useUserId();

  useEffect(() => {
    console.log("Component mounted - starting data fetch");
    
    const fetchAndProcessData = async () => {
      try {
        console.log("Current userId:", userId);
        
        if (!userId) {
          console.log("No userId found");
          return;
        }

        console.log("Fetching training sessions...");
        const sessions = await getTrainingSessions(userId);
        console.log("All training sessions:", sessions);

        if (!sessions || sessions.length === 0) {
          console.log("No training sessions found");
          return;
        }

        // Calculate date one year ago
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        console.log("Filtering sessions from:", oneYearAgo.toISOString());

        // Filter completed sessions and sessions within the last year
        const filteredSessions = sessions.filter((session: TrainingSession) => {
          const sessionDate = new Date(session.date);
          const isComplete = session.isComplete;
          const isWithinYear = sessionDate >= oneYearAgo;
          return isComplete && isWithinYear;
        });
        console.log("Filtered training sessions (completed and within last year):", filteredSessions);

        // Process sessions to get monthly totals
        const monthlyTotals = new Map<string, number>();
        
        filteredSessions.forEach((session: TrainingSession) => {
          // Handle both string and Date objects
          const dateStr = typeof session.date === 'string' 
            ? session.date 
            : session.date.toISOString();
            
          // Parse the date string directly to get year, month, day
          const [year, month, day] = dateStr.split('T')[0].split('-').map(Number);
          console.log("Processing session date parts:", { year, month, day });
          
          // Month is 1-12 in the date string, but we need 0-11 for the array
          const monthIndex = month - 1;
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const monthKey = months[monthIndex];
          
          console.log(`Month mapping: ${dateStr} -> monthIndex: ${monthIndex} -> monthKey: ${monthKey}`);
          
          const currentTotal = monthlyTotals.get(monthKey) || 0;
          monthlyTotals.set(monthKey, currentTotal + (session.distance || 0));
        });

        // Convert to array and sort by month
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const processedData = months.map(month => ({
          month,
          distance: monthlyTotals.get(month) || 0
        }));

        console.log("Monthly totals:", processedData);
        setMonthlyData(processedData);
      } catch (error) {

      }
    };

    fetchAndProcessData();
  }, [userId]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={monthlyData}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            border: "none",
          }}
          formatter={(value) => [`${value} km`, "Distance"]}
        />
        <Line
          type="monotone"
          dataKey="distance"
          stroke="#0d9488"
          strokeWidth={2}
          dot={{ r: 4, fill: "#0d9488", strokeWidth: 0 }}
          activeDot={{ r: 6, fill: "#0d9488", stroke: "white", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
