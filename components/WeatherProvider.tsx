"use client";

import { useState } from "react";
import { ChildrenProps, WeatherContextProps } from "@/app/lib/types";
import { useFetchWeather, useFetchPlaces } from "@/app/lib/hooks";
import { weatherContext } from "@/components/WeatherContext";


export default function WeatherProvider({ children }: ChildrenProps) {
  const [ location, setLocation] = useState<string>("San Francisco");
  const [ tempUnit, setTempUnit] = useState<string>("F");


  const {weather, isLoading, isError} = useFetchWeather(location as string, tempUnit as string);

  return (
    <weatherContext.Provider value={{
      isLoading,
      isError,
      location,
      tempUnit,
      setTempUnit,
      setLocation,
      weather
    } as WeatherContextProps}>
      {children}
    </weatherContext.Provider>
  );
}