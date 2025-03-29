import { useState, useEffect } from "react";
import axios from "axios";
import { CloudRain, Sun, Snowflake } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const API_KEY = "0d5b681139c945bc9a6172302252903";
const LOCATION = "Montreal";

interface WeatherForecast {
  forecast: {
    forecastday: {
      date: string;
      day: {
        condition: {
          text: string;
          code: number;
        };
        daily_will_it_rain: number;
        daily_will_it_snow: number;
        avgtemp_c: number;
      };
      hour: {
        time: string;
        will_it_rain: number;
        will_it_snow: number;
        chance_of_rain: number;
        chance_of_snow: number;
        condition: {
          text: string;
          code: number;
        };
      }[];
    }[];
  };
}

interface BadWeatherPeriod {
  day: string;
  timeRanges: string[];
  conditions: string[];
}

const WeatherAlert: React.FC = () => {
  const [hasBadWeather, setHasBadWeather] = useState<boolean>(false);
  const [badWeatherPeriods, setBadWeatherPeriods] = useState<
    BadWeatherPeriod[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkWeatherForecast = async () => {
      try {
        setLoading(true);
        const response = await axios.get<WeatherForecast>(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${LOCATION}&days=3&aqi=no&alerts=no`,
        );

        const forecastDays = response.data.forecast.forecastday;
        const badWeatherPeriods: BadWeatherPeriod[] = [];
        let hasBadWeather = false;

        forecastDays.forEach((forecastDay) => {
          const date = new Date(forecastDay.date + "T00:00:00");
          const today = new Date();

          let dayName;
          if (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
          ) {
            dayName = "Today";
          } else {
            dayName = date.toLocaleDateString("en-US", { weekday: "long" });
          }

          const badWeatherHours: { time: string; condition: string }[] = [];
          let currentRange: { times: string[]; condition: string } | null =
            null;

          forecastDay.hour.forEach((hourData, index) => {
            const time = new Date(hourData.time);
            const hourString = time.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            });

            const isRaining = hourData.will_it_rain === 1;
            const isSnowing = hourData.will_it_snow === 1;

            if (isRaining || isSnowing) {
              hasBadWeather = true;
              const condition = isSnowing ? "snow" : "rain";

              if (!currentRange) {
                currentRange = {
                  times: [hourString],
                  condition,
                };
              } else if (currentRange.condition === condition) {
                if (
                  index === forecastDay.hour.length - 1 ||
                  !(
                    forecastDay.hour[index + 1].will_it_rain === 1 ||
                    forecastDay.hour[index + 1].will_it_snow === 1
                  ) ||
                  (forecastDay.hour[index + 1].will_it_snow === 1 &&
                    condition === "rain") ||
                  (forecastDay.hour[index + 1].will_it_rain === 1 &&
                    condition === "snow")
                ) {
                  currentRange.times.push(hourString);
                  badWeatherHours.push({
                    time: `${currentRange.times[0]} - ${currentRange.times[1]}`,
                    condition,
                  });
                  currentRange = null;
                }
              } else {
                currentRange.times.push(hourString);
                badWeatherHours.push({
                  time: `${currentRange.times[0]} - ${currentRange.times[1]}`,
                  condition: currentRange.condition,
                });
                currentRange = {
                  times: [hourString],
                  condition,
                };
              }
            } else if (currentRange) {
              currentRange.times.push(hourString);
              badWeatherHours.push({
                time: `${currentRange.times[0]} - ${currentRange.times[1]}`,
                condition: currentRange.condition,
              });
              currentRange = null;
            }
          });

          if (badWeatherHours.length > 0) {
            const rainTimeRanges = badWeatherHours
              .filter((hour) => hour.condition === "rain")
              .map((hour) => hour.time);

            const snowTimeRanges = badWeatherHours
              .filter((hour) => hour.condition === "snow")
              .map((hour) => hour.time);

            if (rainTimeRanges.length > 0 || snowTimeRanges.length > 0) {
              const conditions: string[] = [];
              if (rainTimeRanges.length > 0) conditions.push("rain");
              if (snowTimeRanges.length > 0) conditions.push("snow");

              badWeatherPeriods.push({
                day: dayName,
                timeRanges: [...rainTimeRanges, ...snowTimeRanges],
                conditions,
              });
            }
          }
        });

        setHasBadWeather(hasBadWeather);
        setBadWeatherPeriods(badWeatherPeriods);
        setLoading(false);
      } catch (err) {
        console.error("Weather API error:", err);
        setError("Unable to fetch weather data");
        setLoading(false);
      }
    };

    checkWeatherForecast();
  }, []);

  if (loading) return null;
  if (error) return null;

  if (!hasBadWeather) {
    return (
      <div className="rounded-lg bg-white p-4 shadow-sm border border-slate-200 mt-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-teal-50 rounded-md">
              <Sun className="h-4 w-4 text-teal-600" />
            </div>
            <span className="text-sm font-medium text-slate-700">
              Weather Forecast
            </span>
          </div>
          <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100">
            Favorable
          </Badge>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          It's a good day to run! No unfavorable weather conditions expected in
          the next 3 days.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm border border-slate-200 mt-0">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <div className="p-1.5 bg-amber-50 rounded-md">
            {badWeatherPeriods.flatMap((p) => p.conditions).includes("snow") ? (
              <Snowflake className="h-4 w-4 text-amber-600" />
            ) : (
              <CloudRain className="h-4 w-4 text-amber-600" />
            )}
          </div>
          <span className="text-sm font-medium text-slate-700">
            Weather Alert
          </span>
        </div>
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
          Warning
        </Badge>
      </div>
      <p className="text-xs text-slate-500 mt-1 mb-2">
        Unfavorable temperatures expected due to{" "}
        {badWeatherPeriods.flatMap((p) => p.conditions).includes("snow") &&
        badWeatherPeriods.flatMap((p) => p.conditions).includes("rain")
          ? "rain and snow"
          : badWeatherPeriods.flatMap((p) => p.conditions).includes("snow")
            ? "snow"
            : "rain"}{" "}
        in the next 3 days
      </p>

      <div className="mt-2">
        {badWeatherPeriods.map((period, index) => (
          <div key={index} className="text-xs mb-1">
            <span className="font-medium text-amber-700">{period.day}:</span>
            <span className="text-slate-600 ml-1">
              {period.timeRanges.join(", ")}
              {period.conditions.length > 1
                ? ` (${period.conditions.join(" and ")})`
                : period.conditions[0] === "snow"
                  ? " (snow)"
                  : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherAlert;
