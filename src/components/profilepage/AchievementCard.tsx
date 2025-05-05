import { AchievementBadge } from "@/types/models";
import { Card, CardContent } from "../ui/card";

export function AchievementCard({
  achievement,
}: {
  achievement: AchievementBadge;
}) {
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
