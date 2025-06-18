import {
  Award,
  Calendar,
  Cloud,
  FlameIcon as Fire,
  Flag,
  MapPin,
  Mountain,
  Sunrise,
  Zap,
  Moon,
  Trophy,
} from "lucide-react";

interface AchievementData {
  id: number;
  name: string;
  description: string;
  icon: any;
  dateAchieved?: string;
  color: string;
  earned: boolean;
}

const AllAchievements: AchievementData[] = [
  {
    id: 1,
    name: "First Run",
    description: "Completed your first run",
    icon: Flag,
    color: "bg-teal-100 text-teal-700",
    earned: false,
  },
  {
    id: 2,
    name: "Early Bird",
    description: "Completed a run before 6 AM",
    icon: Sunrise,
    color: "bg-orange-100 text-orange-700",
    earned: false,
  },
  {
    id: 3,
    name: "Night Owl",
    description: "Completed a run after 9 PM",
    icon: Moon,
    color: "bg-indigo-100 text-indigo-700",
    earned: false,
  },
  {
    id: 4,
    name: "5K Runner",
    description: "Completed a 5K run",
    icon: Trophy,
    color: "bg-green-100 text-green-700",
    earned: false,
  },
  {
    id: 5,
    name: "10K Runner",
    description: "Completed a 10K run",
    icon: Trophy,
    color: "bg-blue-100 text-blue-700",
    earned: false,
  },
  {
    id: 6,
    name: "Half Marathon",
    description: "Completed a half marathon",
    icon: Trophy,
    color: "bg-purple-100 text-purple-700",
    earned: false,
  },
  {
    id: 7,
    name: "Marathon",
    description: "Completed a full marathon",
    icon: Award,
    color: "bg-red-100 text-red-700",
    earned: false,
  },
];

export default AllAchievements;
