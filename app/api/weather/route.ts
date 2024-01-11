import { WeatherResponse, OpenWeatherResponse } from "@/app/lib/types";
import { NextResponse } from "next/server";

const WEATHER_API_URL = "https://api.openweathermap.org/data/3.0/onecall";
const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY?.toString() || "";

const GEOCODE_API_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const PLACES_API_KEY = process.env.PLACES_API_KEY?.toString() || "";

/**
 * Fetch weather data from OpenWeatherMap API
 *
 * Example call:
 * https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
 *
 * Parameters:
 * lat (req): latitude, decimal (-90; 90)
 * lon (req): longitude, decimal (-180; 180)
 * appid (req): api key
 * exclude (opt): exclude parts of weather data from API response (comma separated)
 *    - current
 *    - minutely
 *    - hourly
 *    - daily
 *    - alerts
 * units (opt): unit of measurement
 *    - standard (default)
 *    - metric
 *    - imperial
 * lang (opt): get output in your language
 */

export async function GET(request: Request) {
  // Get search params from request url
  const { searchParams } = new URL(request.url);

  // Parse location from searchParams
  const placeId = searchParams.get("placeId") || "";
  const city = searchParams.get("city") || "";
  const tempUnit = searchParams.get("tempUnit") || "";

  // If not location, return error
  if (!placeId) {
    return NextResponse.json({ error: "No Location provided" }, { status: 400 });
  }

  const coordinates = await fetchCoordinates(placeId);

  let lat = coordinates?.results[0]?.geometry?.location?.lat;
  let lon = coordinates.results[0]?.geometry?.location?.lng;

  try {
    const response = await fetch(WEATHER_API_URL + '?' + new URLSearchParams({
      lat: lat.toString(),
      lon: lon.toString(),
      appid: WEATHER_API_KEY,
      units: tempUnit === "C" ? "metric" : "imperial"
    }));


    //TODO: instead of refetching data just for updating the units, consider converting the data ourself.

    //TODO: deal with weather status != 200

    // check for forecast data
    const forecastResponse = (await response.json()) as OpenWeatherResponse;

    const weather: WeatherResponse = {
      current: {
        location: city,
        dt: forecastResponse.current.dt,
        temp: Math.round(forecastResponse.current.temp),
        windSpeed: forecastResponse.current.wind_speed,
        humidity: forecastResponse.current.humidity,
        precipitation: forecastResponse.hourly[0].pop,
        weather: forecastResponse.current.weather,
      },
      daily: forecastResponse.daily.map(day => ({
        temp: {
          dayTime: Math.round(day.temp.day)
        },
        dt: day.dt,
        weather: day.weather
      }))
    }

    // return formatted forecast data json
    return NextResponse.json(weather, { status: 200 });

  } catch (error) {
    //handle error
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


async function fetchCoordinates(location: string) {
  const sanitizeLocation = encodeURI(location) || "";

  try {
    const response = await fetch(GEOCODE_API_URL + "?" + new URLSearchParams({
      place_id: sanitizeLocation,
      key: PLACES_API_KEY
    }))

    const coordinates = (await response.json())

    return coordinates
  } catch (error) {
    console.log('error',error);
    // handle server error
  }
}
