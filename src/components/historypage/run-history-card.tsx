import { useState } from "react";
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
import pastRuns from "@/helper/data/fakeRun";

export default function RunHistoryCard() {
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
    <Card>
      <CardHeader>
        <CardTitle>Run History</CardTitle>
        <CardDescription>View and filter your past runs</CardDescription>
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
            <Select value={selectedtype} onValueChange={setSelectedtype}>
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

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead className="hidden md:table-cell">Duration</TableHead>
                <TableHead>Pace</TableHead>
                <TableHead className="hidden md:table-cell">
                  Training Plan
                </TableHead>
                <TableHead className="hidden lg:table-cell">Shoe</TableHead>
                <TableHead>Run Type</TableHead>
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
                      {new Date(run.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
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
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
