"use client";

import fetchCurrentWeather, { fetchWeeklyForecast } from "@/lib/weather-forecast";
import LocationInput from "./LocationInput";
import { useEffect, useState } from "react";
import WeeklyForecast from "./WeeklyForecast";
import CurrentWeatherBlock from "./CurrentWeatherBlock";
import CurrentWeatherDetails from "./CurrentWeatherDetails";


export default function Weather() {
  const [location, setLocation] = useState("");
  const [realTimeWeather, setRealTimeWeather] = useState<{date: string; dayOfWeek: string; location: string; temperature: string; weatherDescription: string, details: {
    precipitation: string,
    humidity: string,
    windSpeed: string
  }}>({
    date: '',
    dayOfWeek:'',
    location:'',
    temperature:'',
    weatherDescription:'',
    details: {
      precipitation: '',
      humidity: '',
      windSpeed: '',
    }
  });

  const [forecast, setForecast] = useState()

  useEffect(() => {
    if(location) {
      (async () => {
        const realTimeResults = await fetchCurrentWeather(location);
        setRealTimeWeather(realTimeResults);
        const forecastResults = await fetchWeeklyForecast(location);
        setForecast(forecastResults);

      })();

      return
    }
  }, [location])

  return (
    <div className="border m-auto rounded-lg grid grid-cols-2 w-[750px]">
      {realTimeWeather?<CurrentWeatherBlock weather={realTimeWeather}/>:""}

      <div className="bg-gray-300 p-7 relative flex flex-col gap-5 justify-center text-sm">
        {realTimeWeather? <CurrentWeatherDetails details={realTimeWeather.details}/> : ""}
        {forecast?<WeeklyForecast forecast={forecast}/> :""}
        <LocationInput handleClick={setLocation}/>
      </div>
    </div>

  )
}