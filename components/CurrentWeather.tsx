"use client";

import Image from "next/image";
import { useContext } from "react";
import { weatherContext } from "./WeatherContext";
import { convertUnit, formatDate, formatDayOfWeek } from "@/app/lib/helpers";
import { WeatherDataSkeletonProps } from "@/app/lib/types";

/**
 * CurrentWeather Component
 *
 * Component for displaying current selected location's current weather information
 * such as day of week, date, city, temperature, weather description and icon related to weather.
 * Displays a UI skeleton while weather data is loading or cannot be fetched properly
 *
 * Data from weather context:
 *  - `weather`: weather data for selected location
 *  - `unit`: unit of measurement for temperature and wind speed (metric or imperial)
 *  - `isLoading`: indicates whether if weather data is currently being fetched
 *  - `error`: error data if an issue with fetching weather data occurs
 *
 */
export default function CurrentWeather() {
  const { weather, unit, isLoading, error } = useContext(weatherContext);

  if (isLoading || error) {
    return (
      <div className="h-[300px] p-7 flex flex-col bg-whiten z-10 relative text-transparent">
        <div className="flex-grow">
          <WeatherDataSkeleton customStyle={"text-2xl"}>day</WeatherDataSkeleton>
          <WeatherDataSkeleton>Date</WeatherDataSkeleton>
          <WeatherDataSkeleton>Location</WeatherDataSkeleton>
        </div>
        <div>
          <WeatherIconSkeleton />
          <WeatherDataSkeleton customStyle={"text-5xl font-medium"}>Temp</WeatherDataSkeleton>
          <WeatherDataSkeleton customStyle={"font-medium"}>Description</WeatherDataSkeleton>
        </div>
      </div>
    );
  }
  if (!isLoading) {
    //current weather forecast
    const current = weather.current;
    const dayOfWeek = formatDayOfWeek(current.dt);
    const currentDate = formatDate(current.dt);
    const city = current.location.split(", ").slice(0, 2).join(", ");

    return (
      <div className="h-[300px] p-7 flex flex-col bg-whiten z-10 relative text-white shadow">
        <div className="flex-grow">
          <p className="text-2xl font-bold text-shadow-sm">{dayOfWeek}</p>
          <p>{currentDate}</p>
          <p>{city}</p>
        </div>
        <div>

        <Image src={`/assets/weather-icons/${current.weather[0].icon}.svg`} width={50} height={50} alt={dayOfWeek} className="invert"/>
          <p className="text-5xl font-medium">{convertUnit(unit, current.temp, "temp")}°</p>
          <p className="font-medium">{current.weather[0].description}</p>

        </div>
      </div>
    );
  }
}

/**
 * WeatherDataSkeleton
 * Displays a UI skeleton where weather data should be displayed
 *
 * Props:
 *  - `customStyles`: custom css
 *  - `children`
 */
function WeatherDataSkeleton({ customStyle, children }: WeatherDataSkeletonProps) {
  return (
    <p className={`${customStyle} text-shadow-sm  w-fit relative before:rounded before:content-[''] before:absolute before:top-[15%] before:w-full before:left-0 before:bg-[rgba(255,255,255,0.4)] before:backdrop-blur-sm before:h-[75%]`}>{children}</p>
  );
}

/**
 * WeatherIconSkeleton
 * Displays a UI skeleton where weather icon should be displayed
 */
function WeatherIconSkeleton() {
  return (
    <span className="relative w-[50px] inline-block before:rounded before:content-[''] before:absolute before:top-0 before:w-full before:left-0 before:bg-[rgba(255,255,255,0.4)] before:backdrop-blur-sm before:h-full"><Image src={`/assets/weather-icons/01d.svg`} width={50} height={50} alt="preview" className="relative opacity-0" /></span>
  );
}

