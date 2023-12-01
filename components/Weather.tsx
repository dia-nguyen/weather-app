"use client";

import fetchCurrentWeather from "@/lib/weather-forecast";
import LocationInput from "./LocationInput";
import { useEffect, useState } from "react";

export default function Weather() {
  const [location, setLocation] = useState("");
  const [currentWeather, setCurrentWeather] = useState("");

  useEffect(() => {
    if(location) {
      (async () => {
        const results = await fetchCurrentWeather(location);
        console.log('results',results);

      })();

      return
    }
  }, [location])

  return (
    <div>
      <LocationInput handleClick={setLocation}/>
    </div>
  )
}