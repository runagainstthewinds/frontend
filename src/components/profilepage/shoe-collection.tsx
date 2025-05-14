"use client";
import { useCallback, useEffect, useState } from "react";
import { Shoe as ShoeView, ShoeResponse } from "@/types/models";
import { AddShoeFormData } from "@/types/form";
import { resToView } from "@/helper/mapShoeView";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AddShoeModal } from "../form/running-shoe/add-shoe-modal";
import { useUserId } from "@/hooks/useUserInfo";
import { getShoeCollection } from "@/api/shoeCollection";
import { addShoeToCollection } from "@/api/shoeCollection";

// Sample shoe data
// const shoes = [
//   {
//     id: 1,
//     name: "Nike Pegasus 39",
//     brand: "Nike",
//     image: "/pegasus.webp?height=80&width=120",
//     currentMileage: 320,
//     maxMileage: 500,
//     color: "Blue/White",
//     purchaseDate: "2023-05-15",
//   },
//   {
//     id: 2,
//     name: "Hoka Clifton 8",
//     brand: "Hoka",
//     image: "/clifton.webp?height=80&width=120",
//     currentMileage: 160,
//     maxMileage: 450,
//     color: "Black/Orange",
//     purchaseDate: "2023-08-22",
//   },
//   {
//     id: 3,
//     name: "Brooks Ghost 14",
//     brand: "Brooks",
//     image: "/brooks.avif?height=80&width=120",
//     currentMileage: 410,
//     maxMileage: 500,
//     color: "Gray/Yellow",
//     purchaseDate: "2023-02-10",
//   },
//   {
//     id: 4,
//     name: "Saucony Ride 15",
//     brand: "Saucony",
//     image: "/saucony.webp?height=80&width=120",
//     currentMileage: 75,
//     maxMileage: 450,
//     color: "Red/White",
//     purchaseDate: "2023-11-05",
//   },
// ];

export function ShoeCollection() {
  const [isAddShoeModalOpen, setIsAddShoeModalOpen] = useState(false);
  const userId = useUserId();
  const [shoes, setShoes] = useState<ShoeView[]>([]);

  const fetchCollection = useCallback(async () => {
    if (!userId) return;
    getShoeCollection(userId).then((collection) => {
      setShoes(collection.map((shoe: ShoeResponse) => resToView(shoe)));
    });
  }, [userId])

  const handleAddShoe = async (data: AddShoeFormData) => {
    if (!userId) return;
    try {
      await addShoeToCollection(userId, data);
      await fetchCollection();
      setIsAddShoeModalOpen(false);
    } 
    catch(err) {
      console.log("Add failed:", err);
    }
  };

  useEffect(() => {
    fetchCollection()
  }, [fetchCollection])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Shoes</h2>
        <AddShoeModal
          open={isAddShoeModalOpen}
          onOpenChange={setIsAddShoeModalOpen}
          onSubmit={handleAddShoe}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shoes.map((shoe) => (
          <ShoeCard key={shoe.id} shoe={shoe} />
        ))}
      </div>
    </div>
  );
}

// interface Shoe {
//   id: number;
//   name: string;
//   brand: string;
//   image: string;
//   currentMileage: number;
//   maxMileage: number;
//   color: string;
//   purchaseDate: string;
// }

function ShoeCard({ shoe }: { shoe: ShoeView }) {
  const percentUsed = (shoe.currentMileage / shoe.maxMileage) * 100;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{shoe.name}</CardTitle>
        <CardDescription>
          {shoe.brand} • {shoe.color}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="shrink-0 h-20 w-20 rounded-md border bg-muted flex items-center justify-center overflow-hidden">
            <img
              src={shoe.image || "/placeholder.svg"}
              alt={shoe.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              Added on {new Date(shoe.purchaseDate).toLocaleDateString()}
            </p>
            <p className="text-sm font-medium">
              {shoe.currentMileage} / {shoe.maxMileage} km
            </p>
            <div className="w-full">
              <Progress value={percentUsed} className="h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
