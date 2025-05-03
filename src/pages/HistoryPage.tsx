"use client";

import { useState } from "react";
import { Calendar, Filter, Search, ArrowUpDown, Loader } from "lucide-react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserSidebar } from "@/components/user-sidebar";
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
import RecentRunsCard from "@/components/historypage/recent-runs-card";
import RunningStatsCard from "@/components/historypage/running-stats-card";
import MonthlyMileageCard from "@/components/historypage/monthly-mileage-card";

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

export default HistoryPage;
