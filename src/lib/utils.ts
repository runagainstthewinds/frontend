import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function kmToMiles(km: number, precision: number = 1) {
  if (km === 0) return "0.0";
  return (km * 0.621371).toFixed(precision);
}

export function milesToKm(miles: number) {
  if (miles === 0) return "0.0";
  return (miles / 0.621371).toFixed(1);
}

export function paceConverter(_pace: string, _unit: "km" | "mi") {
  if (_pace && !_pace.includes(":") && !isNaN(parseFloat(_pace))) {
    const numericPace = parseFloat(_pace);
    const minutes = Math.floor(numericPace);
    const seconds = Math.round((numericPace - minutes) * 60);
    _pace = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  if (_unit === "mi") {
    const [minutes, seconds] = _pace.split(":").map(Number);
    const totalMinutes = minutes + seconds / 60;
    const paceInMi = totalMinutes / 1.60934; // Convert to km pace
    return `${Math.floor(paceInMi)}:${Math.round((paceInMi % 1) * 60)}`;
  } else if (_unit === "km") {
    const [minutes, seconds] = _pace.split(":").map(Number);
    const totalMinutes = minutes + seconds / 60;
    const paceInKm = totalMinutes * 1.60934; // Convert to mi pace
    const secs = Math.round((paceInKm % 1) * 60);
    return `${Math.floor(paceInKm)}:${secs.toString().padStart(2, "0")}`;
  }
}
