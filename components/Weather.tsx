"use client";

import fetchCurrentWeather from "@/lib/weather-forecast";
import LocationInput from "./LocationInput";
import { useEffect, useState } from "react";
import WeatherBlock from "./WeatherBlock";


export default function Weather() {
  const [location, setLocation] = useState("");
  const [realTimeWeather, setRealTimeWeather] = useState<{date: string; dayOfWeek: string; location: string; temperature: string; weatherDescription: string}>({
    date: '',
    dayOfWeek:'',
    location:'',
    temperature:'',
    weatherDescription:'',
  });

  useEffect(() => {
    if(location) {
      (async () => {
        const results = await fetchCurrentWeather(location);
        setRealTimeWeather(results)

      })();

      return
    }
  }, [location])

  return (
    <div>
      <LocationInput handleClick={setLocation}/>
      <WeatherBlock realTimeWeather={realTimeWeather}/>
    </div>
  )
}