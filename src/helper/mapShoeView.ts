import { Shoe as ShoeView } from "@/types/models";
import { ShoeResponse } from "@/types/models";

const DEFAULT_IMG = "/shoe-collection-default.png";
const MAX_MILEAGE = 600;

const getBrandLogo = (brand: string): string => {
  switch (brand) {
    case "Adidas":
      return "/Adidas.png";
    case "Altra":
      return "/Altra.png";
    case "ASICS":
      return "/Asics.png";
    case "Brooks":
      return "/brooks-logo-png_seeklogo-471573.png";
    case "HOKA":
      return "/Hoka.png";
    case "Inov-8":
      return "/Inov.png";
    case "Mizuno":
      return "/Mizuno.png";
    case "New Balance":
      return "/New_balance.png";
    case "Nike":
      return "/Nike.png";
    case "On":
      return "/On.png";
    case "Puma":
      return "/Puma.jpg";
    case "Reebok":
      return "/Reebok.png";
    case "Salomon":
      return "/Salomon.png";
    case "Saucony":
      return "/Saucony.png";
    case "Skechers":
      return "/Sketchers.png";
    case "Under Armour":
      return "/Under_armour.png";
    default:
      return DEFAULT_IMG;
  }
};

export const resToView = (shoe: ShoeResponse): ShoeView => {
  return {
    id: shoe.shoeId,
    name: shoe.model,
    brand: shoe.brand,
    color: shoe.color,
    purchaseDate: shoe.date,
    currentMileage: shoe.totalMileage,
    maxMileage: MAX_MILEAGE,
    image: getBrandLogo(shoe.brand),
  };
};
