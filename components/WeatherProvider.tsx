"use client";

import { useState } from "react";
import { ChildrenProps, WeatherContextProps } from "@/app/lib/types";
import { useFetchWeather, useFetchCityscape } from "@/app/lib/hooks";
import { weatherContext } from "@/components/WeatherContext";
import { UNITS } from "@/app/lib/helpers";


export default function WeatherProvider({ children }: ChildrenProps) {
  const [ location, setLocation] = useState(DEFAULT_LOCATION);
  const [ unit, setUnit ] = useState<string>("metric");
  const { background } = useFetchCityscape(location.city);
  const { weather, isLoading, isError } = useFetchWeather(location.id as string, location.city as string, UNITS[unit].temp as string);

  return (
    <weatherContext.Provider value={{
      isLoading,
      isError,
      location,
      setUnit,
      unit,
      setLocation,
      weather,
      background
    } as WeatherContextProps}>
      {children}
    </weatherContext.Provider>
  );
}

const DEFAULT_LOCATION = {
  "id": "ChIJW6c_TQPchVQR4JjVq5hIi9I",
  "city": "Surrey, BC, Canada"
}