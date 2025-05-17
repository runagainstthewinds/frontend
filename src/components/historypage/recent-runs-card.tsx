import { getTrainingSessions } from "@/api/trainingSession";
import { useAuth } from "@/context/AuthContext";
import { TrainingSession } from "@/types/models";
import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Alert, AlertTitle } from "../ui/alert";
import { Loader } from "lucide-react";
import RunType from "../runtype";
import { mapTrainingTypeToRunType } from "@/helper/mapTrainingType";
import { format } from "date-fns";

const ITEMS_PER_PAGE = 5; // Number of items to display per page

export default function RecentRunsCard() {
  const { user } = useAuth();
  const [pastRuns, setPastRuns] = useState<TrainingSession[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    if (!user.userId) return;
    console.log("Fetching runs for user:", user.userId);
    setLoading(true);
    setError(null);

    getTrainingSessions(user.userId)
      .then((data) => setPastRuns(data))
      .catch((err) => setError(err.message ?? "Failed to load runs"))
      .finally(() => setLoading(false));
  }, [user]);

  const recentRuns = useMemo(() => {
    return [...pastRuns]
      .filter(run => 
        run.achievedPace !== null && 
        run.achievedDistance !== null && 
        run.achievedDuration !== null
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, ITEMS_PER_PAGE);
  }, [pastRuns]);

  console.log("User Id is ", user?.userId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Runs</CardTitle>
        <CardDescription>Your latest running activities</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {loading && (
          <div className="flex justify-center py-8">
            <Loader className="h-6 w-6 animate-spin" />
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Something went wrong</AlertTitle>
          </Alert>
        )}

        {!loading && !error && recentRuns.length === 0 && (
          <div className="text-center text-muted-foreground py-6">
            No runs to show yet.
          </div>
        )}

        {!loading &&
          !error &&
          recentRuns.map((run) => (
            <RunCardItem key={run.trainingSessionId} run={run} />
          ))}

        {/* TODO: Add pagination controls here when pastRuns.length > ITEMS_PER_PAGE */}
      </CardContent>
    </Card>
  );
}

function RunCardItem({ run }: { run: TrainingSession }) {
  const roundedPaceTwoDecimals = run.achievedPace.toFixed(2);
  const formattedDate = format(new Date(run.date + "T12:00:00Z"), "MMM d, yyyy");
  
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg">
      <div className="sm:w-1/4">
        <div className="text-lg font-semibold">
          {formattedDate}
        </div>
        <div className="text-muted-foreground">{run.trainingPlanId ?? "—"}</div>
      </div>

      <div className="sm:w-1/4 grid grid-cols-2 gap-2">
        {[
          ["Distance", `${run.achievedDistance} km`],
          ["Duration", `${run.achievedDuration} min`],
          ["Pace", `${roundedPaceTwoDecimals} min/km`],
          ["Type", run.trainingType],
        ].map(([label, value]) => (
          <div key={label}>
            <div className="text-sm text-muted-foreground">{label}</div>
            <div className="font-Interval">{value}</div>
          </div>
        ))}
      </div>

      <div className="sm:w-1/4">
        <div className="text-sm text-muted-foreground">Shoe</div>
        <div className="font-Interval">{run.shoeId ?? "—"}</div>
        <div className="mt-2">
          <RunType type={mapTrainingTypeToRunType(run.trainingType)} />
        </div>
      </div>

      <div className="sm:w-1/4">
        <div className="text-sm text-muted-foreground">Notes</div>
        <div className="text-sm">{run.notes ?? "No notes"}</div>
      </div>
    </div>
  );
}
