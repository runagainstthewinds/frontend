import { ACHIEVEMENTS, AchievementType } from "../types/achievements";
import { AchievementCard } from "./AchievementCard";

interface AchievementsListProps {
    unlockedAchievements?: AchievementType[];
}

export function AchievementsList({ unlockedAchievements = [] }: AchievementsListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {Object.values(ACHIEVEMENTS).map((achievement) => (
                <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    unlocked={unlockedAchievements.includes(achievement.id)}
                />
            ))}
        </div>
    );
} 