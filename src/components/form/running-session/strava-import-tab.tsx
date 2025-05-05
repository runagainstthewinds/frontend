import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { StravaImportTabProps } from "@/types/form";
import { StravaRun } from "@/types/models";
import { AnimatePresence, motion } from "framer-motion";
import {
  Badge,
  ChevronRight,
  Clock,
  RotateCcw,
  Timer,
  TrendingUp,
} from "lucide-react";

const StravaImportTab: React.FC<StravaImportTabProps> = ({
  runs,
  selectedRun,
  handleSelectRun,
  shoes,
}) => {
  return (
    <TabsContent value="strava" className="p-0">
      <div className="p-6 pb-3 border-b">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">Select a run from today</p>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center text-teal-600 border-teal-200 hover:bg-teal-50 group"
          >
            <RotateCcw className="mr-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-60 cursor-pointer" />
            Refresh
          </Button>
        </div>
      </div>
      <div className="max-h-[300px] overflow-y-auto">
        <AnimatePresence>
          {runs.map((run: StravaRun) => (
            <motion.div
              key={run.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className={`p-4 border-b cursor-pointer hover:bg-slate-50 transition ${
                  selectedRun === run.id ? "bg-teal-50" : ""
                }`}
                onClick={() => handleSelectRun(run.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-slate-900">{run.title}</h4>
                    <p className="text-sm text-slate-500">{run.time}</p>
                  </div>
                  <div className="flex items-center">
                    {selectedRun === run.id && (
                      <Badge className="mr-2 bg-teal-600">Selected</Badge>
                    )}
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="flex items-center text-sm text-slate-700">
                    <TrendingUp className="h-3.5 w-3.5 mr-1.5 text-slate-500" />
                    {run.distance} km
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    <Timer className="h-3.5 w-3.5 mr-1.5 text-slate-500" />
                    {run.pace} min/km
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    <Clock className="h-3.5 w-3.5 mr-1.5 text-slate-500" />
                    {run.duration}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </TabsContent>
  );
};

export default StravaImportTab;
