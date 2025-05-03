"use client";

import { useUnit } from "@/context/UnitContext";
import { kmToMiles } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", distance: 120 },
  { month: "Feb", distance: 145 },
  { month: "Mar", distance: 132 },
  { month: "Apr", distance: 167 },
  { month: "May", distance: 189 },
  { month: "Jun", distance: 156 },
  { month: "Jul", distance: 178 },
  { month: "Aug", distance: 201 },
  { month: "Sep", distance: 187 },
  { month: "Oct", distance: 210 },
  { month: "Nov", distance: 185 },
  { month: "Dec", distance: 162 },
];

export function MonthlyMileageChart() {
  const { distanceUnit } = useUnit();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis
          tick={{ fontSize: 12 }}
          label={{
            value: distanceUnit === "km" ? "Distance (km)" : "Distance (mi)",
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "middle" },
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            border: "none",
          }}
          formatter={(value) => [
            distanceUnit === "km"
              ? `${value} km`
              : `${kmToMiles(Number(value))} mi`,
            "Distance",
          ]}
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
