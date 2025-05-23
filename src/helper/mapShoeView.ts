import { Shoe as ShoeView } from "@/types/models";
import { ShoeResponse } from "@/types/models";

const MAX_MILEAGE = 600;

export const resToView = (shoe: ShoeResponse): ShoeView => {
  return {
    name: shoe.model,
    brand: shoe.brand,
    color: shoe.color,
    purchaseDate: shoe.date,
    currentMileage: shoe.totalMileage,
    maxMileage: MAX_MILEAGE,
    image: `/shoe-collection/shoe-${shoe.color.toLowerCase()}.png`,
  };
};
