"use client";

import { UNITS, convertUnit } from "@/app/lib/helpers";
import { weatherContext } from "./WeatherContext";
import { useContext } from "react";

/**
 * CurrentWeatherDetails Component
 *
 * Component for displaying current selected location's current weather addtional details
 * such as precipitation, humidity and windspeed.
 * Displays a UI skeleton while weather data is loading or cannot be fetched properly
 *
 * Data from weather context:
 *  - `weather`: weather data for selected location
 *  - `unit`: unit of measurement for temperature and wind speed (metric or imperial)
 *  - `isLoading`: indicates whether if weather data is currently being fetched
 *  - `error`: error data if an issue with fetching weather data occurs
 *
 */
export default function CurrentWeatherDetails() {
  const { isLoading, error, weather, unit } = useContext(weatherContext);

  if (isLoading || error) {
    return (
      <div className="w-full">
        <WeatherDetailsSkeleton>Precipitation</WeatherDetailsSkeleton>
        <WeatherDetailsSkeleton>Humidity</WeatherDetailsSkeleton>
        <WeatherDetailsSkeleton>WindSpeed</WeatherDetailsSkeleton>
      </div>
    );
  }

  if (!isLoading) {
    const details = weather.current;
    const speedUnit = UNITS[unit].speed;
    return (
      <div className="w-full grid grid-cols-2">
        <span>Precipitation:</span> <span className="text-right">{details.precipitation}%</span>
        <span>Humidity:</span> <span className="text-right">{details.humidity}%</span>
        <span>Wind:</span> <span className="text-right">{convertUnit(unit,details.windSpeed,"speed")} {speedUnit}</span>
      </div>
    );
  }
}

/**
 * WeatherDetailsSkeleton
 * Displays a UI skeleton where current weather details should be displayed
 *
 * Props:
 *  - `children`
 */
function WeatherDetailsSkeleton({ children }: { children: string; }) {
  return (
    <div className={`w-full text-transparent relative before:rounded before:content-[''] before:absolute before:top-[15%] before:w-full before:left-0 before:bg-[rgba(255,255,255,0.4)] before:backdrop-blur-sm before:h-[75%]`}>{children}</div>
  );
}