"use client";

import { useState } from "react";
import { ChildrenProps, WeatherContextProps } from "@/app/lib/types";
import { useFetchWeather, useFetchCityscape } from "@/app/lib/hooks";
import { weatherContext } from "@/components/WeatherContext";

/**
 * WeatherProvider Component
 *
 * The context provider that manages weather and location related data and provides it its child component through context.
 * Allows for components within context to access data such as location, weather, photos, unit, loading status, error messages
 *
 * States:
 *  - `location`: current selected location { id, city }
 *  - `unit`: unit of measurement for temperature and wind speed (metric or imperial)
 *
 * Data:
 *  - `photos`: cityscape photo data from unsplash
 *  - `weather`: weather data for selected location
 *  - `isLoading`: indicates whether if weather data is currently being fetched
 *  - `error`: error data if an issue with fetching weather data occurs
 *
 *  Props:
 * - `children`: child component, WeatherApp that will have access to weather context data.
 *    <WeatherProvider><WeatherApp/></WeatherProvider>
 */
export default function WeatherProvider({ children }: ChildrenProps) {
  const [ location, setLocation ] = useState(DEFAULT_LOCATION);
  const [ unit, setUnit ] = useState<string>(DEFAULT_UNIT);
  const { photos, isLoading: photosIsLoading } = useFetchCityscape(location.city);
  const { weather, isLoading, error } = useFetchWeather(location.id as string, location.city as string);

  return (
    <weatherContext.Provider value={{
      isLoading,
      error,
      location,
      setUnit,
      unit,
      setLocation,
      photosIsLoading,
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

const DEFAULT_UNIT = "metric";