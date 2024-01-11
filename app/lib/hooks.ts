"use client";
import useSWR from "swr";
import { fetcher } from "./helpers";
import { LocationProps, WeatherResponse } from "./types";

/**
 * Fetch weather from /api/weather
 */
export function useFetchWeather(placeId: string, city:string, tempUnit: string) : WeatherHookData {
  const { data, error } = useSWR(`/api/weather?placeId=${placeId}&city=${city}&tempUnit=${tempUnit}`, fetcher);

  return {
    weather: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useFetchPlaces(query: string) : PlacesHookData {
  const {data, error} = useSWR(`/api/places?query=${query}`, fetcher)

  // URL does not need to be passed into fetcher as the useSWR hook calls fetcher with the URL
  return {
    locations: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useFetchCityscape(query: string) {
  console.log('query',query);
  const {data, error} = useSWR(`/api/unsplash?location=${query}`, fetcher);

  return {
    background: data,
    isLoading: !error && !data,
    isError: error,
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
