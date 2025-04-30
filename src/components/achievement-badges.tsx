import AllAchievements from "@/helper/data/allAchievements";
import { useMemo, useState, useEffect } from "react";
import { getUserAchievements } from "@/api/user";
import { Loader } from "lucide-react";
import { AchievementCard } from "./AchievementCard";
import { useUserId } from "@/hooks/useUserInfo";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UserAchievement } from "@/types/models";

export function AchievementBadges() {
  const userId = useUserId();
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    console.log("Fetching user achievements... for userId:", userId);
    getUserAchievements(userId)
      .then((response) => {
        console.log("Fetched user achievements:", response);
        setUserAchievements(response);
      })
      .catch((err) => setError(err.message || "Failed to fetch achievements"))
      .finally(() => setLoading(false));
  }, [userId]);

  const displayAchievements = useMemo(() => {
    return AllAchievements.map((a) => {
      const earnedRecord = userAchievements.find(
        (ua) => ua.achievementId === a.id,
      );
      return {
        ...a,
        earned: Boolean(earnedRecord),
      };
    });
  }, [userAchievements]);

  const earnedAchievements = displayAchievements.filter((a) => a.earned);
  const lockedAchievements = displayAchievements.filter((a) => !a.earned);

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
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader className="animate-spin h-6 w-6" />
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-8">{error}</div>
          ) : earnedAchievements.length === 0 ? (
            <div className="text-gray-500 text-center py-8">
              No achievements earned yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {earnedAchievements.map((a) => (
                <AchievementCard key={a.id} achievement={a} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="locked" className="mt-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader className="animate-spin h-6 w-6" />
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-8">{error}</div>
          ) : lockedAchievements.length === 0 ? (
            <div className="text-gray-500 text-center py-8">
              All achievements unlocked!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {lockedAchievements.map((a) => (
                <AchievementCard key={a.id} achievement={a} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
