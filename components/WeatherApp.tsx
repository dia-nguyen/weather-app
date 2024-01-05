"use client";

import { fetchPhotos } from "@/app/api/weather-deprecated/unsplash";
import { useEffect, useState, useRef } from "react";
import LocationInput from "./LocationInput";
import WeeklyForecastBlocks from "./WeeklyForecastBlocks";
import CurrentWeatherBlock from "./CurrentWeatherBlock";
import CurrentWeatherDetails from "./CurrentWeatherDetails";
import fetchCurrentWeather, { ForecastProps, RealTimeWeatherProps, fetchWeeklyForecast } from "@/app/lib/weather-forecast";
import ErrorMessage from "./ErrorMessage";

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
  const [location, setLocation] = useState("vancouver");
  const [forecast, setForecast] = useState<ForecastProps>({
    data: DEFAULT_FORECAST,
    isLoading: true,
    errorMsg: ''
  });
  const [photo, setPhoto] = useState("");
  const [realTimeWeather, setRealTimeWeather] = useState<RealTimeWeatherProps>({
    data: DEFAULT_WEATHER,
    isLoading: true,
    errorMsg: ''
  });


  useEffect(() => {
    if (location) {
      // Set loading states for all data types
      setRealTimeWeather(prev => ({ ...prev, isLoading: true }));
      setForecast(prev => ({ ...prev, isLoading: true }));

      const fetchData = async () => {
        try {
          // Fetch all necessary data
          const realTimeResults = await fetchCurrentWeather(location);
          const forecastResults = await fetchWeeklyForecast(location);
          const photoResponse = await fetchPhotos(location);

          // Update state with fetched data
          setRealTimeWeather({ data: realTimeResults, isLoading: false, errorMsg: '' });
          setForecast({ data: forecastResults, isLoading: false, errorMsg: '' });
          setPhoto(photoResponse.results[1].urls.full);
        } catch (error: any) {
          // Handle errors and update state accordingly
          const errorMsg = error.message || 'Failed to fetch data';
          setRealTimeWeather(prev => ({ ...prev, isLoading: false, errorMsg }));
          setForecast(prev => ({ ...prev, isLoading: false, errorMsg }));
        }
      };

      fetchData();
    }
  }, [location]);

  return (
    <main className=" w-full h-screen flex  bg-cover bg-center" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url(${photo})`}}>

     <div className=" m-auto rounded-lg grid grid-cols-2 w-[750px] relative overflow-hidden shadow-lg">
      <div className="relative">
        <div className="absolute w-full h-full top-0 opacity-70 bg-cover bg-center rounded-l"  style={{backgroundImage: `url(${photo})`}}></div>
        {realTimeWeather ? <CurrentWeatherBlock weather={realTimeWeather}/>: ""}
      </div>

      <div className="text-white border-[rgba(255,255,255,0.2)] rounded-r border-t border-r border-b bg-[rgba(255,255,255,0.1)] backdrop-blur-sm p-7 relative flex flex-col gap-5 justify-center text-sm">
        {realTimeWeather ? <CurrentWeatherDetails weather={realTimeWeather}/> : ""}
        {forecast?<WeeklyForecastBlocks forecast={forecast}/> :""}
        <LocationInput handleClick={setLocation}/>

      </div>
     {realTimeWeather.errorMsg && <ErrorMessage message={realTimeWeather.errorMsg}/>}
    </div>
  </main>
  )
};

export const DEFAULT_WEATHER = {
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

export const DEFAULT_FORECAST = [{
  date: '',
  dayOfWeek: '',
  temperature: '',
  description: '',
  code: 0,
}]