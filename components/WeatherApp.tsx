"use client";

import { fetchPhotos } from "@/app/api/weather/unsplash";
import { useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import WeeklyForecastBlocks from "./WeeklyForecastBlocks";
import CurrentWeatherBlock from "./CurrentWeatherBlock";
import CurrentWeatherDetails from "./CurrentWeatherDetails";
import fetchCurrentWeather, { fetchWeeklyForecast } from "@/lib/weather-forecast";
import { RealTimeWeatherProps, WeatherInfoProps } from "@/lib/weather-forecast";

/**
 * Weather is a React component for displaying weather information and related photos.
 * It displays the current weather, a weekly forecast, and a photo based on the specified location.
 *
 * Structure:
 * - Uses `useState` to manage state for location, forecast data, photo URL, and current weather.
 * - Fetches weather data and photos using `useEffect` when the location changes.
 * - Contains subcomponents:
 *   - LocationInput: Allows user to input a location.
 *   - CurrentWeatherBlock: Displays the current weather.
 *   - CurrentWeatherDetails: Shows detailed information about the current weather.
 *   - WeeklyForecastBlocks: Presents the weekly weather forecast.
 * - Background photo changes based on the fetched photo for the location.
 *
 * Props:
 * - No props taken. Location is set to "new york" by default and can be changed by the user.
 *
 * States:
 * - location (string): Currently selected location.
 * - forecast (WeatherInfoProps[]): Array of weather forecast data.
 * - photo (string): URL of the photo related to the location.
 * - realTimeWeather (RealTimeWeatherProps): Data for the current weather.
 *
 * Defaults:
 * - DEFAULT_WEATHER: Default state for realTimeWeather.
 * - DEFAULT_FORECAST: Default state for forecast.
 */

export default function Weather() {
  const [location, setLocation] = useState("new york");
  const [forecast, setForecast] = useState<WeatherInfoProps[]>(DEFAULT_FORECAST);
  const [photo, setPhoto] = useState("");
  const [realTimeWeather, setRealTimeWeather] = useState<RealTimeWeatherProps>(DEFAULT_WEATHER);

  //TODO: refactor to fetch data through SSR
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
        {forecast?<WeeklyForecastBlocks forecast={forecast}/> :""}
        <LocationInput handleClick={setLocation}/>

      </div>
    </div>
  </main>
  )
};

const DEFAULT_WEATHER = {
  date: '',
  dayOfWeek: '',
  location: '',
  temperature: '',
  description: '',
  code: 0,
  details: {
    precipitation: 0,
    humidity: 0,
    windSpeed: 0,
  }
}

const DEFAULT_FORECAST = [{
  date: '',
  dayOfWeek: '',
  location: '',
  temperature: '',
  description: '',
  code: 0,
}]