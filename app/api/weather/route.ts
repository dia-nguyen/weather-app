import { WeatherResponse } from "@/app/lib/types";
import { NextResponse } from "next/server";

const WEATHER_API_URL = "https://api.openweathermap.org/data/3.0/onecall";
const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY?.toString() || "";
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
  const location = searchParams.get("location") || "";
  const tempUnit = searchParams.get("tempUnit") || "";

  // If not location, return error
  if (!location) {
    return NextResponse.json({ error: "No Location provided" }, { status: 400 });
  }

  // Fall back coords
  let lat = 37.773972;
  let lon = -122.431297;

  // Fetch data
  try {
    const response = await fetch(WEATHER_API_URL + '?' + new URLSearchParams({
      lat: lat.toString(),
      lon: lon.toString(),
      appid: WEATHER_API_KEY,
      units: tempUnit === "C" ? "metric" : "imperial"
    }));

    // deal with weather status != 200
    const forecastResponse = (await response.json()) as WeatherResponse;

    // check for forecast data
    return NextResponse.json({
      current: {
        location: location,
        dt: forecastResponse.current.dt,
        temp: Math.round(forecastResponse.current.temp),
        windSpeed: forecastResponse.current.wind_speed,
        humidity: forecastResponse.current.humidity,
        precipitation: forecastResponse.hourly[0].pop,
        weather: forecastResponse.current.weather,
      },
      daily: forecastResponse.daily.map(day => ({
        temp: day.temp,
        dt: day.dt,
        weather: day.weather
      }))
    }, { status: 200 });

  } catch (error) {
    //handle error
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}