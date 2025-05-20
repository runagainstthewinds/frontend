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

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function MonthlyMileageChart() {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const userId = useUserId();

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        if (!userId) return;

        const sessions = await getTrainingSessions(userId);
        if (!sessions || sessions.length === 0) return;

        // Calculate date one year ago
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        // Filter completed sessions and sessions within the last year
        const filteredSessions = sessions.filter((session: TrainingSession) => {
          const sessionDate = new Date(session.date);
          return session.isComplete && sessionDate >= oneYearAgo;
        });

        // Process sessions to get monthly totals
        const monthlyTotals = new Map<string, number>();
        
        filteredSessions.forEach((session: TrainingSession) => {
          const dateStr = typeof session.date === 'string' 
            ? session.date 
            : session.date.toISOString();
            
          const [year, month] = dateStr.split('T')[0].split('-').map(Number);
          const monthIndex = month - 1;
          const monthKey = MONTHS[monthIndex];
          
          const currentTotal = monthlyTotals.get(monthKey) || 0;
          monthlyTotals.set(monthKey, currentTotal + (session.distance || 0));
        });

        // Convert to array and sort by month
        const processedData = MONTHS.map(month => ({
          month,
          distance: monthlyTotals.get(month) || 0
        }));

        setMonthlyData(processedData);
      } catch (error) {
        console.error("An error occurred while fetching and processing data:", error);
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
