import { Shoe, StravaRun } from "@/types/models";

export const mockShoes: Shoe[] = [
  {
    id: 1,
    name: "Nike Pegasus 39",
    brand: "Nike",
    image: "/pegasus.webp?height=80&width=120",
    currentMileage: 320,
    maxMileage: 500,
    color: "Blue/White",
    purchaseDate: "2023-05-15",
  },
  {
    id: 2,
    name: "Hoka Clifton 8",
    brand: "Hoka",
    image: "/clifton.webp?height=80&width=120",
    currentMileage: 160,
    maxMileage: 450,
    color: "Black/Orange",
    purchaseDate: "2023-08-22",
  },
  {
    id: 3,
    name: "Brooks Ghost 14",
    brand: "Brooks",
    image: "/brooks.avif?height=80&width=120",
    currentMileage: 410,
    maxMileage: 500,
    color: "Gray/Yellow",
    purchaseDate: "2023-02-10",
  },
  {
    id: 4,
    name: "Saucony Ride 15",
    brand: "Saucony",
    image: "/saucony.webp?height=80&width=120",
    currentMileage: 75,
    maxMileage: 450,
    color: "Red/White",
    purchaseDate: "2023-11-05",
  },
];

export const mockStravaRuns: StravaRun[] = [
  {
    id: 1,
    title: "Morning Run",
    time: "7:15 AM",
    distance: 5.2,
    pace: "5:30",
    duration: "28:36",
    intensity: 3,
  },
  {
    id: 2,
    title: "Lunch Break Run",
    time: "12:30 PM",
    distance: 3.5,
    pace: "5:45",
    duration: "20:08",
    intensity: 2,
  },
  {
    id: 3,
    title: "Evening Trail Run",
    time: "6:20 PM",
    distance: 8.1,
    pace: "6:10",
    duration: "50:02",
    intensity: 4,
  },
];
