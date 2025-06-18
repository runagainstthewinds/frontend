import { Achievement } from "../types/achievements";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Trophy } from "lucide-react";

interface AchievementCardProps {
    achievement: Achievement;
    unlocked?: boolean;
}

export function AchievementCard({ achievement, unlocked = false }: AchievementCardProps) {
    return (
        <Card className={`transition-all duration-300 ${unlocked ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50'}`}>
            <CardHeader className="flex flex-row items-center gap-2">
                <Trophy className={`h-5 w-5 ${unlocked ? 'text-yellow-500' : 'text-gray-400'}`} />
                <CardTitle className="text-lg">{achievement.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-600">{achievement.description}</p>
            </CardContent>
        </Card>
    );
} 