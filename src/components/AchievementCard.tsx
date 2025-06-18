import { AchievementBadge } from "@/types/models";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Trophy } from "lucide-react";

interface AchievementCardProps {
    achievement: AchievementBadge;
}

export function AchievementCard({ achievement }: AchievementCardProps) {
    const formatDate = (dateString: string) => {
        // Split the date string into components
        const [year, month, day] = dateString.split('-').map(Number);
        // Create date with explicit components and add one day to fix timezone offset
        const date = new Date(Date.UTC(year, month - 1, day + 1));
        return date.toLocaleDateString();
    };

    return (
        <Card className={`transition-all duration-300 ${achievement.earned ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50'}`}>
            <CardHeader className="flex flex-row items-center gap-2">
                <Trophy className={`h-5 w-5 ${achievement.earned ? 'text-yellow-500' : 'text-gray-400'}`} />
                <div className="flex-1">
                    <CardTitle className="text-lg">{achievement.name}</CardTitle>
                    {achievement.date && (
                        <p className="text-xs text-gray-500 mt-1">
                            Achieved on {formatDate(achievement.date)}
                        </p>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-600">{achievement.description}</p>
            </CardContent>
        </Card>
    );
} 