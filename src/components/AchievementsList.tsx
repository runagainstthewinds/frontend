import { ACHIEVEMENTS, AchievementType } from "../types/achievements";
import { AchievementCard } from "./AchievementCard";

interface UserAchievement {
    achievementId: number;
    dateAchieved: string;
}

interface AchievementsListProps {
    unlockedAchievements?: UserAchievement[];
}

export function AchievementsList({ unlockedAchievements = [] }: AchievementsListProps) {
    const achievementsWithDates = Object.values(ACHIEVEMENTS).map(achievement => {
        const userAchievement = unlockedAchievements.find(ua => ua.achievementId === achievement.id);
        return {
            ...achievement,
            dateAchieved: userAchievement?.dateAchieved
        };
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {achievementsWithDates.map((achievement) => (
                <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    unlocked={!!achievement.dateAchieved}
                />
            ))}
        </div>
    );
} 