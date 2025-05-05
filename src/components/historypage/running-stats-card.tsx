import pastRuns from "@/helper/data/fakeRun";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useUnit } from "@/context/UnitContext";
import { kmToMiles } from "@/lib/utils";

function RunningStatsCard() {
  const totalDistance: any = pastRuns
    .reduce((sum, run) => sum + run.distance, 0)
    .toFixed(1);
  const totalRuns = pastRuns.length;
  const avgDistance = (totalDistance / totalRuns).toFixed(1);
  const totalTime = 32;
  const { distanceUnit } = useUnit();

  const displayTotalDistance =
    distanceUnit === "km"
      ? totalDistance
      : kmToMiles(parseFloat(totalDistance));

  const displayAvgDistance =
    distanceUnit === "km" ? avgDistance : kmToMiles(parseFloat(avgDistance));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Running Statistics</CardTitle>
        <CardDescription>Your performance at a glance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Distance</p>
            <p className="text-2xl font-bold">
              {displayTotalDistance} {distanceUnit}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Runs</p>
            <p className="text-2xl font-bold">{totalRuns}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Running Time</p>
            <p className="text-2xl font-bold">{totalTime} h</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Average Distance</p>
            <p className="text-2xl font-bold">
              {displayAvgDistance} {distanceUnit}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <h3 className="font-Interval mb-2">type Distribution</h3>
          <div className="flex gap-2">
            {["Recovery", "Interval", "Long Run"].map((type) => {
              const count = pastRuns.filter((run) => run.type === type).length;
              const percentage = Math.round((count / totalRuns) * 100);

              return (
                <div key={type} className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{type}</span>
                    <span>{percentage}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${
                        type === "Recovery"
                          ? "bg-blue-500"
                          : type === "Interval"
                            ? "bg-amber-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default RunningStatsCard;
