"use client";

import { useState } from "react";
import { ChildrenProps, WeatherContextProps } from "@/app/lib/types";
import { useFetchWeather } from "@/app/lib/hooks";
import { weatherContext } from "@/components/WeatherContext";


export default function WeatherProvider({ children }: ChildrenProps) {
  const location = "San Francisco";
  const temp = "C";

  const {weather, isLoading, isError} = useFetchWeather(location as string);
  return (
    <weatherContext.Provider value={{
      isLoading,
      isError,
      location,
      temp,
      weather
    } as WeatherContextProps}>
      {children}
    </weatherContext.Provider>
  );
}