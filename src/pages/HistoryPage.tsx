"use client";

import { useState, useEffect, useMemo } from "react";
import { Calendar, Filter, Search, ArrowUpDown, Loader } from "lucide-react";
import { format } from "date-fns";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserSidebar } from "@/components/user-sidebar";
import { MonthlyMileageChart } from "@/components/monthly-mileage-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RunType from "@/components/runtype";
import pastRuns from "@/helper/data/fakeRun";
import { TrainingSession } from "@/types/models";
import { useAuth } from "@/context/AuthContext";
import { getTrainingSessions } from "../api/trainingSession";
import mapTrainingTypeToRunType from "@/helper/mapTrainingType";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useUnit } from "@/context/UnitContext";
import { kmToMiles, paceConverter } from "@/lib/utils";

const ITEMS_PER_PAGE = 5;

function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedtype, setSelectedtype] = useState("");
  const [selectedShoe, setSelectedShoe] = useState("");

  const filteredRuns = pastRuns.filter((run) => {
    const matchesSearch =
      searchTerm === "" ||
      run.trainingPlan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      run.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      run.shoe.toLowerCase().includes(searchTerm.toLowerCase());

    const matchestype = selectedtype === "" || run.type === selectedtype;

    const matchesShoe = selectedShoe === "" || run.shoe === selectedShoe;

    return matchesSearch && matchestype && matchesShoe;
  });

  const uniqueShoes = [...new Set(pastRuns.map((run) => run.shoe))];

  const { distanceUnit, paceUnit } = useUnit();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen min-w-screen bg-gray-50">
        <div className="md:w-64 md:shrink-0 md:sticky md:top-0 md:h-screen bg-white">
          <UserSidebar />
        </div>
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">History</h1>
          </header>
          <div className="p-6">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <TabsList>
                  <TabsTrigger value="all" className="text-gray-800">
                    All Runs
                  </TabsTrigger>
                  <TabsTrigger value="recent" className="text-gray-800">
                    Recent
                  </TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Date Range
                  </Button>
                  <Button variant="outline" size="sm">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    Sort
                  </Button>
                </div>
              </div>

              <TabsContent value="all" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MonthlyMileageCard />
                  <RunningStatsCard />
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Run History</CardTitle>
                    <CardDescription>
                      View and filter your past runs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search runs..."
                          className="pl-8"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Select
                          value={selectedtype}
                          onValueChange={setSelectedtype}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="Recovery">Recovery</SelectItem>
                            <SelectItem value="Interval">Interval</SelectItem>
                            <SelectItem value="Long Run">Long Run</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select
                          value={selectedShoe}
                          onValueChange={setSelectedShoe}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Shoe" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Shoes</SelectItem>
                            {uniqueShoes.map((shoe) => (
                              <SelectItem key={shoe} value={shoe}>
                                {shoe}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Distance</TableHead>
                            <TableHead className="hidden md:table-cell">
                              Duration
                            </TableHead>
                            <TableHead>Pace</TableHead>
                            <TableHead className="hidden md:table-cell">
                              Training Plan
                            </TableHead>
                            <TableHead className="hidden lg:table-cell">
                              Shoe
                            </TableHead>
                            <TableHead>Run Type</TableHead>
                            <TableHead className="text-right">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredRuns.length === 0 ? (
                            <TableRow>
                              <TableCell
                                colSpan={8}
                                className="text-center py-6 text-muted-foreground"
                              >
                                No runs found matching your filters
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredRuns.map((run) => (
                              <TableRow key={run.id}>
                                <TableCell>
                                  {new Date(run.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    },
                                  )}
                                </TableCell>
                                <TableCell>
                                  {distanceUnit === "km"
                                    ? `${run.distance} km`
                                    : `${kmToMiles(run.distance)} mi`}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {run.duration}
                                </TableCell>
                                <TableCell>
                                  {paceUnit === "min/km"
                                    ? `${run.pace} min/km`
                                    : `${paceConverter(run.pace, "mi")} min/mi`}{" "}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {run.trainingPlan}
                                </TableCell>
                                <TableCell className="hidden lg:table-cell">
                                  {run.shoe}
                                </TableCell>
                                <TableCell>
                                  <RunType
                                    type={
                                      run.type as
                                        | "Recovery"
                                        | "Interval"
                                        | "Long Run"
                                        | "Final Run"
                                    }
                                  />
                                </TableCell>
                                <TableCell className="text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        <span className="sr-only">
                                          Open menu
                                        </span>
                                        <Filter className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>
                                        View Details
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        Edit Run
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        Delete Run
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recent" className="space-y-6">
                <RecentRunsCard />
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function MonthlyMileageCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Mileage</CardTitle>
        <CardDescription>Track your running consistency</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <MonthlyMileageChart />
        </div>
      </CardContent>
    </Card>
  );
}

function RunCardItem({ run }: { run: TrainingSession }) {
  const roundedPaceTwoDecimals = run.achievedPace.toFixed(2);
  const { distanceUnit, paceUnit } = useUnit();

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg">
      <div className="sm:w-1/4">
        <div className="text-lg font-semibold">
          {format(new Date(run.date), "MMM d, yyyy")}
        </div>
        <div className="text-muted-foreground">{run.trainingPlanId ?? "—"}</div>
      </div>

      <div className="sm:w-1/4 grid grid-cols-2 gap-2">
        {[
          [
            "Distance",
            distanceUnit === "km"
              ? `${run.achievedDistance} km`
              : `${kmToMiles(run.achievedDistance)} mi`,
          ],
          ["Duration", `${run.achievedDuration} min`],
          [
            "Pace",
            paceUnit === "min/km"
              ? `${roundedPaceTwoDecimals} min/km`
              : `${paceConverter(roundedPaceTwoDecimals.toString(), "mi")} min/mi`,
          ],
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

export function RecentRunsCard() {
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

function RunningStatsCard() {
  const totalDistance: any = pastRuns
    .reduce((sum, run) => sum + run.distance, 0)
    .toFixed(1);
  const totalRuns = pastRuns.length;
  const avgDistance = Number((totalDistance / totalRuns).toFixed(1));
  const totalTime = 32;
  const { distanceUnit } = useUnit();

  const displayTotalDistance =
    distanceUnit === "km"
      ? `${totalDistance} km`
      : `${kmToMiles(totalDistance)} mi`;
  const displayAvgDistance =
    distanceUnit === "km"
      ? `${avgDistance} km`
      : `${kmToMiles(avgDistance)} mi`;

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
            <p className="text-2xl font-bold">{displayTotalDistance}</p>
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
            <p className="text-2xl font-bold">{displayAvgDistance}</p>
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
export default HistoryPage;
