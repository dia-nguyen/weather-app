"use client";
import useSWR from "swr";
import { fetcher } from "./helpers";
import { LocationProps, WeatherResponse } from "./types";

/**
 * Fetch weather from /api/weather
 */
export function useFetchWeather(placeId: string, city:string, tempUnit: string) : WeatherHookData {
  const { data, error } = useSWR(`/api/weather?placeId=${placeId}&city=${city}&tempUnit=${tempUnit}`, fetcher);

  console.log('weather data',data);
  return {
    weather: data,
    isLoading: !error && !data,
    isError: error,
  }
}

// try {
//   const response = await fetch(`${BASE_URL}/api/weather?location=${location}`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch weather data');
//   }
//   const weather = await response.json();
//   return weather;
// } catch (error) {
//   console.error('fetchWeather error:', error);
//   return null; // or handle the error as needed
// }

export function useFetchPlaces(location: string) : PlacesHookData {
  const {data, error} = useSWR(`/api/places?location=${location}`, fetcher)
  // URL does not need to be passed into fetcher as the useSWR hook calls fetcher with the URL

  return {
    locations: data,
    isLoading: !error && !data,
    isError: error
  }
}
interface PlacesHookData {
  locations: LocationProps[],
  isLoading: boolean,
  isError: boolean
}

interface WeatherHookData {
  weather: WeatherResponse,
  isLoading: boolean,
  isError: boolean
}

