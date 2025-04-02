"use client";

import { useState } from "react";
import { Calendar, Filter, Search, ArrowUpDown } from "lucide-react";
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

const pastRuns = [
  {
    id: 1,
    date: "2023-04-15",
    distance: 10.5,
    duration: "52:30",
    pace: "5:00",
    trainingPlan: "Marathon Prep",
    shoe: "Nike Pegasus 39",
    type: "Interval",
    notes: "Felt good throughout the run",
    elevation: 120,
    heartRate: 152,
  },
  {
    id: 2,
    date: "2023-04-12",
    distance: 5.2,
    duration: "25:15",
    pace: "4:51",
    trainingPlan: "Marathon Prep",
    shoe: "Nike Pegasus 39",
    type: "Long Run",
    notes: "Speed work session",
    elevation: 45,
    heartRate: 168,
  },
  {
    id: 3,
    date: "2023-04-10",
    distance: 15.0,
    duration: "1:20:45",
    pace: "5:23",
    trainingPlan: "Marathon Prep",
    shoe: "Hoka Clifton 8",
    type: "Interval",
    notes: "Long run, slight discomfort in left knee after 12km",
    elevation: 210,
    heartRate: 145,
  },
  {
    id: 4,
    date: "2023-04-08",
    distance: 8.3,
    duration: "42:20",
    pace: "5:06",
    trainingPlan: "Marathon Prep",
    shoe: "Hoka Clifton 8",
    type: "Recovery",
    notes: "Recovery run",
    elevation: 65,
    heartRate: 138,
  },
  {
    id: 5,
    date: "2023-04-05",
    distance: 12.1,
    duration: "1:01:42",
    pace: "5:06",
    trainingPlan: "Marathon Prep",
    shoe: "Nike Pegasus 39",
    type: "Interval",
    notes: "Tempo run",
    elevation: 150,
    heartRate: 162,
  },
  {
    id: 6,
    date: "2023-04-02",
    distance: 18.5,
    duration: "1:41:23",
    pace: "5:29",
    trainingPlan: "Marathon Prep",
    shoe: "Hoka Clifton 8",
    type: "Interval",
    notes: "Long run, felt strong",
    elevation: 245,
    heartRate: 148,
  },
  {
    id: 7,
    date: "2023-03-30",
    distance: 6.4,
    duration: "32:10",
    pace: "5:02",
    trainingPlan: "Marathon Prep",
    shoe: "Nike Pegasus 39",
    type: "Interval",
    notes: "Easy run",
    elevation: 85,
    heartRate: 142,
  },
];

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

    const matchestype =
      selectedtype === "" || run.type === selectedtype;

    const matchesShoe = selectedShoe === "" || run.shoe === selectedShoe;

    return matchesSearch && matchestype && matchesShoe;
  });

  const uniqueShoes = [...new Set(pastRuns.map((run) => run.shoe))];

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
                                <TableCell>{run.distance} km</TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {run.duration}
                                </TableCell>
                                <TableCell>{run.pace} min/km</TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {run.trainingPlan}
                                </TableCell>
                                <TableCell className="hidden lg:table-cell">
                                  {run.shoe}
                                </TableCell>
                                <TableCell>
                                  <RunType
                                    type={
                                      run.type as "Recovery" | "Interval" | "Long Run"
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

function RecentRunsCard() {
  const recentRuns = [...pastRuns]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Runs</CardTitle>
        <CardDescription>Your latest running activities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {recentRuns.map((run) => (
          <div
            key={run.id}
            className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg"
          >
            <div className="sm:w-1/4">
              <div className="text-lg font-semibold">
                {new Date(run.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div className="text-muted-foreground">{run.trainingPlan}</div>
            </div>
            <div className="sm:w-1/4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-sm text-muted-foreground">Distance</div>
                  <div className="font-Interval">{run.distance} km</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                  <div className="font-Interval">{run.duration}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Pace</div>
                  <div className="font-Interval">{run.pace} min/km</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Elevation</div>
                  <div className="font-Interval">{run.elevation} m</div>
                </div>
              </div>
            </div>
            <div className="sm:w-1/4">
              <div className="text-sm text-muted-foreground">Shoe</div>
              <div className="font-Interval">{run.shoe}</div>
              <div className="mt-2">
                <RunType
                  type={run.type as "Recovery" | "Interval" | "Long Run"}
                />
              </div>
            </div>
            <div className="sm:w-1/4">
              <div className="text-sm text-muted-foreground">Notes</div>
              <div className="text-sm">{run.notes}</div>
            </div>
          </div>
        ))}
        <div className="flex justify-center">
          <Button variant="outline">View All Runs</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function RunningStatsCard() {
  const totalDistance: any = pastRuns
    .reduce((sum, run) => sum + run.distance, 0)
    .toFixed(1);
  const totalRuns = pastRuns.length;
  const avgDistance = (totalDistance / totalRuns).toFixed(1);
  const totalTime = 32;

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
            <p className="text-2xl font-bold">{totalDistance} km</p>
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
            <p className="text-2xl font-bold">{avgDistance} km</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <h3 className="font-Interval mb-2">type Distribution</h3>
          <div className="flex gap-2">
            {["Recovery", "Interval", "Long Run"].map((type) => {
              const count = pastRuns.filter(
                (run) => run.type === type,
              ).length;
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
