"use client";

import {
  Award,
  Calendar,
  Cloud,
  FlameIcon as Fire,
  Flag,
  MapPin,
  Mountain,
  Sunrise,
  Zap,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const achievements = [
  {
    id: 1,
    name: "First Run",
    description: "Completed your first run",
    icon: Flag,
    date: "2023-01-15",
    color: "bg-teal-100 text-teal-700",
    earned: true,
  },
  {
    id: 2,
    name: "Early Bird",
    description: "Completed a run before 6 AM",
    icon: Sunrise,
    date: "2023-02-22",
    color: "bg-orange-100 text-orange-700",
    earned: true,
  },
  {
    id: 3,
    name: "Rain Runner",
    description: "Completed a run in the rain",
    icon: Cloud,
    date: "2023-03-10",
    color: "bg-blue-100 text-blue-700",
    earned: true,
  },
  {
    id: 4,
    name: "Marathon Finisher",
    description: "Completed a full marathon",
    icon: Award,
    date: null,
    color: "bg-purple-100 text-purple-700",
    earned: false,
  },
  {
    id: 5,
    name: "Streak Master",
    description: "Run for 7 consecutive days",
    icon: Fire,
    date: "2023-05-28",
    color: "bg-red-100 text-red-700",
    earned: true,
  },
  {
    id: 6,
    name: "Trail Explorer",
    description: "Completed a trail run",
    icon: Mountain,
    date: "2023-06-15",
    color: "bg-green-100 text-green-700",
    earned: true,
  },
  {
    id: 7,
    name: "Speed Demon",
    description: "Ran 5K under 20 minutes",
    icon: Zap,
    date: null,
    color: "bg-yellow-100 text-yellow-700",
    earned: false,
  },
  {
    id: 8,
    name: "Globe Trotter",
    description: "Run in 5 different cities",
    icon: MapPin,
    date: null,
    color: "bg-indigo-100 text-indigo-700",
    earned: false,
  },
  {
    id: 9,
    name: "Consistency King",
    description: "Run 20 times in a month",
    icon: Calendar,
    date: null,
    color: "bg-cyan-100 text-cyan-700",
    earned: false,
  },
];

export function AchievementBadges() {
  const earnedAchievements = achievements.filter((a) => a.earned);
  const lockedAchievements = achievements.filter((a) => !a.earned);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Achievements</h2>

      <Tabs defaultValue="earned">
        <TabsList>
          <TabsTrigger value="earned">
            Earned ({earnedAchievements.length})
          </TabsTrigger>
          <TabsTrigger value="locked">
            Locked ({lockedAchievements.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="earned" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {earnedAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="locked" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lockedAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  date: string | null;
  color: string;
  earned: boolean;
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const { name, description, icon: Icon, date, color, earned } = achievement;

  return (
    <Card className={earned ? "" : "opacity-60"}>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          {earned && date && (
            <p className="text-xs text-muted-foreground">
              Earned on {new Date(date).toLocaleDateString()}
            </p>
          )}
          {!earned && (
            <p className="text-xs text-muted-foreground italic">
              Keep running to unlock this achievement
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
