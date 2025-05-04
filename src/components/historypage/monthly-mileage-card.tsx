import { MonthlyMileageChart } from "./monthly-mileage-chart";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

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

export default MonthlyMileageCard;
