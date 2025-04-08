interface Shoe {
  id: number;
  name: string;
  brand: string;
  image: string;
  currentMileage: number;
  maxMileage: number;
  color: string;
  purchaseDate: string;
}

interface StravaRun {
  id: number;
  title: string;
  time: string;
  distance: number;
  pace: string;
  duration: string;
  intensity: number;
}

interface SessionRunFormData {
  distance: string;
  pace: string;
  duration: string;
  intensity: number;
  shoeId: number | null;
}

export type { Shoe, StravaRun, SessionRunFormData };
