"use client";

import fetchCurrentWeather, { fetchWeeklyForecast } from "@/lib/weather-forecast";
import LocationInput from "./LocationInput";
import { useEffect, useState } from "react";
import WeeklyForecast from "./WeeklyForecast";
import CurrentWeatherBlock from "./CurrentWeatherBlock";
import CurrentWeatherDetails from "./CurrentWeatherDetails";
import { fetchPhotos } from "@/app/api/weather/unsplash";

import Image from "next/image";


export default function Weather() {
  const [location, setLocation] = useState("vancouver");
  const [forecast, setForecast] = useState();
  const [background, setBackground] = useState("");
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

  useEffect(() => {
    if(location) {
      (async () => {
        const realTimeResults = await fetchCurrentWeather(location);
        setRealTimeWeather(realTimeResults);
        const forecastResults = await fetchWeeklyForecast(location);
        setForecast(forecastResults);

        const background = await fetchPhotos(location);
        setBackground(background.results[0].urls.regular);
      })();

      return
    }
  }, [location])


  return (
    <div className=" m-auto rounded-lg grid grid-cols-2 w-[750px] relative overflow-hidden shadow-lg">
      <div className="relative ">
        <div className="absolute w-full h-full top-0 opacity-70 bg-cover bg-center"  style={{backgroundImage: `url(${background})`}}></div>
        {realTimeWeather?<CurrentWeatherBlock weather={realTimeWeather}/>:""}
      </div>

      <div className="text-white border-[rgba(255,255,255,0.2)] border-t border-r border-b bg-[rgba(255,255,255,0.1)] backdrop-blur-sm p-7 relative flex flex-col gap-5 justify-center text-sm">
        {realTimeWeather? <CurrentWeatherDetails details={realTimeWeather.details}/> : ""}
        {forecast?<WeeklyForecast forecast={forecast}/> :""}
        <LocationInput handleClick={setLocation}/>

      </div>
    </div>

  )
};