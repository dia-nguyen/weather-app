"use client";

import Image from "next/image";
import { weatherContext } from "./WeatherContext";
import { useContext } from "react";
import { DailyProps } from "@/app/lib/types";
import { formatDayOfWeek } from "@/app/lib/helpers";

export default function WeeklyForecast() {
  const { isLoading, isError, weather } = useContext(weatherContext);
  if (isLoading) {
    return (
      <ForecastSkeleton />
    );
  }

  if (!isLoading) {
    const forecast = weather.daily;

    return (
      <div className="grid grid-cols-6 border rounded-lg  border-[rgba(255,255,255,0.2)]">
        {forecast.map((day: DailyProps, index: any) => (
          index >= 1 && index <= 6 && (
            <div key={index} className={`p-2 text-center ${index == 1 ? "bg-[rgba(255,255,255,0.2)]" : ""}`}>
              <Image src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} width={30} height={30} alt={day.weather[0].description} />
              <p>{formatDayOfWeek(day.dt)}</p>
              <p>{day.temp.day}</p>
            </div>)
        ))}
      </div>
    );
  }
}

function ForecastSkeleton() {
  return (
    <div className="grid grid-cols-6 border rounded-lg  border-[rgba(255,255,255,0.2)]">
      {Array.from(Array(6), (_, i) => <div className={`p-2 text-center ${i == 0 ? "bg-[rgba(255,255,255,0.2)]" : ""}`} key={i}>
        <span className="relative w-[25px] inline-block before:rounded before:content-[''] before:absolute before:top-0 before:w-full before:left-0 before:bg-[rgba(255,255,255,0.4)] before:backdrop-blur-sm before:h-full"><Image src={`/assets/weather-icons/1001.svg`} width={30} height={30} alt="preview" className="relative opacity-0" /></span>
        <p className="text-transparent w-full relative before:rounded before:content-[''] before:absolute before:top-[15%] before:w-full before:left-0 before:bg-[rgba(255,255,255,0.4)] before:backdrop-blur-sm before:h-[75%]">Day</p>
        <p className="text-transparent w-full relative before:rounded before:content-[''] before:absolute before:top-[15%] before:w-full before:left-0 before:bg-[rgba(255,255,255,0.4)] before:backdrop-blur-sm before:h-[75%]">Temp</p>
      </div>)}
    </div>
  );
}