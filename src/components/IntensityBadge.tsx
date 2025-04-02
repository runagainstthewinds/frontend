import { Badge } from "@/components/ui/badge"


function IntensityBadge({ intensity }: { intensity: 'Low' | 'Medium' | 'High' }) {
    const colorMap = {
      Low: "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200",
      Medium: "bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200",
      High: "bg-red-50 text-red-700 hover:bg-red-100 border-red-200",
    }
  
    return (
      <Badge variant="outline" className={colorMap[intensity]}>
        {intensity}
      </Badge>
    )
  }

export default IntensityBadge;