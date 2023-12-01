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
  const [location, setLocation] = useState("new york");
  const [forecast, setForecast] = useState();
  const [photo, setPhoto] = useState("");
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

        const photo = await fetchPhotos(location);
        setPhoto(photo.results[1].urls.full);
      })();

      return
    }
  }, [location])


  return (
    <main className=" w-full h-screen grid  bg-cover bg-center" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url(${photo})`}}>
     <div className=" m-auto rounded-lg grid grid-cols-2 w-[750px] relative overflow-hidden shadow-lg">
      <div className="relative ">
        <div className="absolute w-full h-full top-0 opacity-70 bg-cover bg-center"  style={{backgroundImage: `url(${photo})`}}></div>
        {realTimeWeather?<CurrentWeatherBlock weather={realTimeWeather}/>:""}
      </div>

      <div className="text-white border-[rgba(255,255,255,0.2)] border-t border-r border-b bg-[rgba(255,255,255,0.1)] backdrop-blur-sm p-7 relative flex flex-col gap-5 justify-center text-sm">
        {realTimeWeather? <CurrentWeatherDetails details={realTimeWeather.details}/> : ""}
        {forecast?<WeeklyForecast forecast={forecast}/> :""}
        <LocationInput handleClick={setLocation}/>

      </div>
    </div>
  </main>
  )
};