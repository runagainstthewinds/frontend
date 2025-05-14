import { Shoe as ShoeView } from "@/types/models";
import { ShoeResponse } from "@/types/models";

const DEFAULT_IMG = "/shoe-collection-default.png"
const MAX_MILEAGE = 600;

export const resToView = (shoe: ShoeResponse): ShoeView => {
  return {
    id: shoe.shoeId,
    name: shoe.model,
    brand: shoe.brand,
    color: shoe.color,
    purchaseDate: shoe.date,
    currentMileage: shoe.totalMileage,
    maxMileage: MAX_MILEAGE,
    image: DEFAULT_IMG,
  };
};