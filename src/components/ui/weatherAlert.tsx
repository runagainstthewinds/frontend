import { useState, useEffect } from "react";
import axios from "axios";
import {
  CloudRain,
  Snowflake,
  Sun,
  AlertTriangle,
  Cloud,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

// setup env one day
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
        maxtemp_c: number;
        mintemp_c: number;
      };
      hour: {
        time: string;
        temp_c: number;
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

interface HourlyForecast {
  time: string;
  hour: string;
  temp_c: number;
  condition: string;
}

interface DayForecast {
  day: string;
  date: string;
  hours: HourlyForecast[];
  hasBadWeather: boolean;
  maxTemp: number;
  minTemp: number;
  mainCondition: string;
}

const WeatherAlert: React.FC = () => {
  const [forecast, setForecast] = useState<DayForecast[]>([]);
  const [hasBadWeather, setHasBadWeather] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  useEffect(() => {
    const checkWeatherForecast = async () => {
      try {
        setLoading(true);
        const response = await axios.get<WeatherForecast>(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${LOCATION}&days=3&aqi=no&alerts=no`,
        );

        const forecastDays = response.data.forecast.forecastday;
        const processedForecast: DayForecast[] = [];
        let anyBadWeather = false;

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

          const currentHour = today.getHours();

          const hours: HourlyForecast[] = [];
          let dayHasBadWeather = false;

          forecastDay.hour.forEach((hourData) => {
            const hourTime = new Date(hourData.time);
            const hourNumber = hourTime.getHours();

            if (dayName === "Today" && hourNumber < currentHour) {
              return;
            }

            const isRaining = hourData.will_it_rain === 1;
            const isSnowing = hourData.will_it_snow === 1;

            let condition = "clear";
            if (isRaining) condition = "rain";
            if (isSnowing) condition = "snow";
            if (
              !isRaining &&
              !isSnowing &&
              hourData.condition.text.toLowerCase().includes("cloud")
            ) {
              condition = "cloudy";
            }

            if (isRaining || isSnowing) {
              dayHasBadWeather = true;
              anyBadWeather = true;
            }

            hours.push({
              time: hourData.time,
              hour: hourTime.toLocaleTimeString("en-US", {
                hour: "numeric",
                hour12: true,
              }),
              temp_c: hourData.temp_c,
              condition,
            });
          });

          let mainCondition = "clear";
          if (forecastDay.day.daily_will_it_snow === 1) {
            mainCondition = "snow";
          } else if (forecastDay.day.daily_will_it_rain === 1) {
            mainCondition = "rain";
          } else if (
            forecastDay.day.condition.text.toLowerCase().includes("cloud")
          ) {
            mainCondition = "cloudy";
          }

          if (hours.length > 0 && dayHasBadWeather) {
            processedForecast.push({
              day: dayName,
              date: forecastDay.date,
              hours,
              hasBadWeather: dayHasBadWeather,
              maxTemp: forecastDay.day.maxtemp_c,
              minTemp: forecastDay.day.mintemp_c,
              mainCondition,
            });
          }
        });

        setForecast(processedForecast);
        setHasBadWeather(anyBadWeather);
        setLoading(false);
      } catch (err) {
        console.error("Weather API error:", err);
        setError("Unable to fetch weather data");
        setLoading(false);
      }
    };

    checkWeatherForecast();
  }, []);

  useEffect(() => {
    if (forecast.length > 0 && selectedDayIndex >= forecast.length) {
      setSelectedDayIndex(0);
    }
  }, [forecast, selectedDayIndex]);

  if (loading) return null;
  if (error) return null;

  if (!hasBadWeather || forecast.length === 0) {
    return null;
  }

  const getWeatherSummary = () => {
    if (forecast.length === 0) return "";

    const conditions = new Set<string>();

    forecast.forEach((day) => {
      day.hours.forEach((hour) => {
        if (hour.condition === "rain" || hour.condition === "snow") {
          conditions.add(hour.condition);
        }
      });
    });

    if (conditions.has("snow") && conditions.has("rain")) {
      return "Rain or snow";
    } else if (conditions.has("snow")) {
      return "Snow";
    } else if (conditions.has("rain")) {
      return "Rain";
    }
    return "";
  };

  const getUnfavorableWeatherDays = () => {
    if (forecast.length === 0) return "";

    const dayNames = forecast.map((day) => {
      if (day.day === "Today") {
        return "Today";
      } else {
        return day.day;
      }
    });

    if (dayNames.length === 1) {
      return dayNames[0];
    } else if (dayNames.length === 2) {
      return `${dayNames[0]} and ${dayNames[1]}`;
    } else {
      const lastDay = dayNames.pop();
      return `${dayNames.join(", ")}, and ${lastDay}`;
    }
  };

  const renderWeatherIcon = (condition: string) => {
    switch (condition) {
      case "rain":
        return <CloudRain className="h-6 w-6 text-amber-600" />;
      case "snow":
        return <Snowflake className="h-6 w-6 text-amber-600" />;
      case "cloudy":
        return <Cloud className="h-6 w-6 text-amber-600" />;
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />;
    }
  };

  const renderLargeWeatherIcon = (condition: string) => {
    switch (condition) {
      case "rain":
        return <CloudRain className="h-6 w-6" />;
      case "snow":
        return <Snowflake className="h-6 w-6" />;
      case "cloudy":
        return <Cloud className="h-6 w-6" />;
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />;
    }
  };

  const weatherSummary = getWeatherSummary();
  const unfavorableWeatherDays = getUnfavorableWeatherDays();
  const selectedDay = forecast[selectedDayIndex];

  return (
    <Alert className="border-amber-200 bg-amber-50 shadow-sm mb-4 relative p-4">
      <div className="absolute top-3 right-3 z-10">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center text-amber-700 hover:bg-amber-100 hover:text-amber-900 text-xs px-2 py-1"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="mr-1">
            {isExpanded ? "Show less" : "Show forecast details"}
          </span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      <AlertTitle className="text-amber-800 font-medium ml-2 flex">
        <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
        Weather Notice
      </AlertTitle>

      <AlertDescription className="text-amber-700">
        <div className="pr-0">
          <p>
            {weatherSummary} expected{" "}
            {unfavorableWeatherDays ? `${unfavorableWeatherDays}` : ""}.
            Consider{" "}
            {weatherSummary.includes("Snow") ? "warm waterproof" : "waterproof"}{" "}
            gear.
          </p>

          {isExpanded && (
            <div className="mt-3">
              <div className="pt-1 mb-4">
                <div className="flex flex-wrap gap-3 pb-3">
                  {selectedDay &&
                    selectedDay.hours
                      .filter(
                        (hour) =>
                          hour.condition === "rain" ||
                          hour.condition === "snow",
                      )
                      .map((hour, hourIndex) => (
                        <div
                          key={hourIndex}
                          className="flex flex-col items-center justify-center w-16 text-center"
                        >
                          <div className="text-sm font-medium">{hour.hour}</div>
                          <div className="my-1 text-amber-700">
                            {renderWeatherIcon(hour.condition)}
                          </div>
                          <div className="text-sm font-bold text-amber-700">
                            {Math.round(hour.temp_c)}°
                          </div>
                        </div>
                      ))}
                </div>
              </div>

              <div className="flex gap-2 mb-3 mt-2 overflow-x-auto pb-1">
                {forecast.map((day, index) => (
                  <Button
                    key={index}
                    variant={selectedDayIndex === index ? "default" : "outline"}
                    className={`flex flex-col items-center justify-center w-20 h-20 p-1 ${
                      selectedDayIndex === index
                        ? "bg-amber-200 hover:bg-amber-300 text-amber-900 border-amber-300"
                        : "border-amber-200 text-amber-700 hover:bg-amber-100 hover:border-amber-300"
                    }`}
                    onClick={() => setSelectedDayIndex(index)}
                  >
                    <span className="text-xs font-medium">{day.day}</span>
                    <div className="my-1">
                      {renderLargeWeatherIcon(day.mainCondition)}
                    </div>
                    <span className="text-xs font-bold">
                      {Math.round(day.maxTemp)}°/{Math.round(day.minTemp)}°
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default WeatherAlert;
