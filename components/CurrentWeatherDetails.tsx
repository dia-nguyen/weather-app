"use client";

import { UNITS, convertUnit } from "@/app/lib/helpers";
import { weatherContext } from "./WeatherContext";
import { useContext } from "react";

export default function CurrentWeatherDetails() {
  const { isLoading, error, weather, unit } = useContext(weatherContext);

  if (isLoading || error) {
    return (
      <div className="w-full">
        <SkeletonDetailsLoader>Precipitation</SkeletonDetailsLoader>
        <SkeletonDetailsLoader>Humidity</SkeletonDetailsLoader>
        <SkeletonDetailsLoader>WindSpeed</SkeletonDetailsLoader>
      </div>
    );
  }

  if (!isLoading) {
    const details = weather.current;
    const speedUnit = UNITS[unit].speed
    return (
      <div className="w-full grid grid-cols-2">
        <span>Precipitation:</span> <span className="text-right">{details.precipitation}%</span>
        <span>Humidity:</span> <span className="text-right">{details.humidity}%</span>
        <span>Wind:</span> <span className="text-right">{convertUnit(unit,details.windSpeed,"speed")} {speedUnit}</span>
      </div>
    );
  }
}

function SkeletonDetailsLoader({ children }: { children: string; }) {
  return (
    <div className={`w-full text-transparent relative before:rounded before:content-[''] before:absolute before:top-[15%] before:w-full before:left-0 before:bg-[rgba(255,255,255,0.4)] before:backdrop-blur-sm before:h-[75%]`}>{children}</div>
  );
}