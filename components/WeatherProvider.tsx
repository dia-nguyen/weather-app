"use client";

import { useState } from "react";
import { ChildrenProps, WeatherContextProps } from "@/app/lib/types";
import { useFetchWeather, useFetchCityscape } from "@/app/lib/hooks";
import { weatherContext } from "@/components/WeatherContext";


export default function WeatherProvider({ children }: ChildrenProps) {
  const [ location, setLocation ] = useState(DEFAULT_LOCATION);
  const [ unit, setUnit ] = useState<string>("metric");
  const { photos } = useFetchCityscape(location.city);
  const { weather, isLoading, error } = useFetchWeather(location.id as string, location.city as string);

  return (
    <weatherContext.Provider value={{
      isLoading,
      error,
      location,
      setUnit,
      unit,
      setLocation,
      weather,
      photos
    } as WeatherContextProps}>
      {children}
    </weatherContext.Provider>
  );
}

const DEFAULT_LOCATION = {
  "id": "ChIJIQBpAG2ahYAR_6128GcTUEo",
  "city": "San Francisco, CA, USA"
}
