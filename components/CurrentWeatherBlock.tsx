"use client";

import Image from "next/image";
import { useContext } from "react";
import { weatherContext } from "./WeatherContext";
import { convertUnit, formatDate, formatDayOfWeek } from "@/app/lib/helpers";
import { SkeletonDataLoaderProps } from "@/app/lib/types";

export default function CurrentWeather() {
  const { isLoading, error, weather, unit } = useContext(weatherContext);

  if (isLoading || error) {
    return (
      <div className="h-[300px] p-7 flex flex-col bg-whiten z-10 relative text-transparent">
        <div className="flex-grow">
          <SkeletonDataLoader custom={"text-2xl"}>day</SkeletonDataLoader>
          <SkeletonDataLoader>Date</SkeletonDataLoader>
          <SkeletonDataLoader>Location</SkeletonDataLoader>
        </div>
        <div>
          <SkeletonIconLoader />
          <SkeletonDataLoader custom={"text-5xl font-medium"}>Temp</SkeletonDataLoader>
          <SkeletonDataLoader custom={"font-medium"}>Description</SkeletonDataLoader>
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

function SkeletonDataLoader({ custom, children }: SkeletonDataLoaderProps) {
  return (
    <p className={`${custom} text-shadow-sm  w-fit relative before:rounded before:content-[''] before:absolute before:top-[15%] before:w-full before:left-0 before:bg-[rgba(255,255,255,0.4)] before:backdrop-blur-sm before:h-[75%]`}>{children}</p>
  );
}

function SkeletonIconLoader() {
  return (
    <span className="relative w-[50px] inline-block before:rounded before:content-[''] before:absolute before:top-0 before:w-full before:left-0 before:bg-[rgba(255,255,255,0.4)] before:backdrop-blur-sm before:h-full"><Image src={`/assets/weather-icons/01d.svg`} width={50} height={50} alt="preview" className="relative opacity-0" /></span>
  );
}

