import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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
import { useAuth } from "@/context/AuthContext";
import { getShoes } from "@/api/shoes";
import { getTrainingSessions } from "@/api/trainingSession";
import { getTrainingPlans } from "@/api/trainingPlan";
import {
  TrainingSession,
  TrainingType,
  Shoe,
  TrainingPlan,
} from "@/types/models";

const getShoeNameById = (shoeId: number | null, shoes: Shoe[]): string => {
  if (shoeId === null) return "No shoe";
  const shoe = shoes.find((s) => s.id === shoeId);
  return shoe ? shoe.name : "Unknown shoe";
};

const getTrainingPlanNameById = (
  planId: number | null,
  plans: TrainingPlan[],
): string => {
  if (planId === null) return "No plan";
  const plan = plans.find((p) => p.trainingPlanId === planId);
  return plan ? plan.planName : "Unknown plan";
};

// Utility to truncate number to two decimals
const formatTwoDecimals = (num: number): string => {
  return (Math.floor(num * 100) / 100).toFixed(2);
};

export default function RunHistoryCard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<TrainingType | "all">("all");
  const [selectedShoe, setSelectedShoe] = useState<string | "all">("all");
  const { user } = useAuth();
  const [pastRuns, setPastRuns] = useState<TrainingSession[]>([]);
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [trainingPlans, setTrainingPlans] = useState<TrainingPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [shoesData, plansData, runsData] = await Promise.all([
          getShoes(user.userId),
          getTrainingPlans(user.userId),
          getTrainingSessions(user.userId),
        ]);
        setShoes(shoesData);
        setTrainingPlans(plansData);
        setPastRuns(runsData);
        console.log("Past runs:", runsData.map(run => ({ date: run.date, isComplete: run.isComplete })));
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Filter completed runs only
  const filteredRuns = pastRuns
    .filter((run) => run.isComplete)
    .filter((run) => {
      const matchesSearch =
        searchTerm === "" ||
        getTrainingPlanNameById(run.trainingPlanId, trainingPlans)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (run.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ??
          false) ||
        getShoeNameById(run.shoeId, shoes)
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesType =
        selectedType === "all" || run.trainingType === selectedType;
      const matchesShoe =
        selectedShoe === "all" ||
        getShoeNameById(run.shoeId, shoes) === selectedShoe;

      return matchesSearch && matchesType && matchesShoe;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  console.log("Filtered runs:", filteredRuns.map(run => ({ date: run.date, isComplete: run.isComplete })));

  const totalPages = Math.ceil(filteredRuns.length / pageSize);
  const paginatedRuns = filteredRuns.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const uniqueShoes = [
    ...new Set(pastRuns.map((run) => getShoeNameById(run.shoeId, shoes))),
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Run History</CardTitle>
        <CardDescription>View and filter your past runs</CardDescription>
      </CardHeader>
      <CardContent>
        {error && <div className="text-red-500 mb-4">{error}</div>}
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
              value={selectedType}
              onValueChange={(value) =>
                setSelectedType(value as TrainingType | "all")
              }
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {Object.values(TrainingType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedShoe} onValueChange={setSelectedShoe}>
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

        {loading ? (
          <div className="text-center py-6 text-muted-foreground">
            Loading runs...
          </div>
        ) : (
          <>
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
                    <TableHead className="hidden lg:table-cell">Shoe</TableHead>
                    <TableHead>Run Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedRuns.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-6 text-muted-foreground"
                      >
                        No runs found matching your filters
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedRuns.map((run) => (
                      <TableRow key={run.trainingSessionId}>
                        <TableCell>
                          {new Date(run.date + "T12:00:00Z").toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell>
                          {formatTwoDecimals(run.achievedDistance)} km
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {formatTwoDecimals(run.achievedDuration)} min
                        </TableCell>
                        <TableCell>
                          {formatTwoDecimals(run.achievedPace)} min/km
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {getTrainingPlanNameById(
                            run.trainingPlanId,
                            trainingPlans,
                          )}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {getShoeNameById(run.shoeId, shoes)}
                        </TableCell>
                        <TableCell>
                          <RunType
                            type={
                              run.trainingType === TrainingType.INTERVAL
                                ? "Interval"
                                : run.trainingType === TrainingType.RECOVERY_RUN
                                  ? "Recovery"
                                  : run.trainingType === TrainingType.LONG_RUN
                                    ? "Long Run"
                                    : "Final Run"
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-end items-center space-x-4 mt-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded border disabled:opacity-50"
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded border disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
