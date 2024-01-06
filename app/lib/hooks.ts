"use client";
const BASE_URL = 'http://localhost:3001';
import useSWR from "swr";

export async function fetcher(url: string) {
  return await fetch(url).then((res) => res.json())
}

/**
 * Fetch weather from /api/weather
 */
export function useFetchWeather(location: string, tempUnit: string){
  const { data, error } = useSWR(`/api/weather?location=${location}&tempUnit=${tempUnit}`, fetcher);

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