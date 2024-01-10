import { WeatherResponse } from "@/app/lib/types";
import { NextResponse } from "next/server";
export const PLACES_API_KEY = process.env.PLACES_API_KEY?.toString() || "";


const WEATHER_API_URL = "https://api.openweathermap.org/data/3.0/onecall";
const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY?.toString() || "";

const GEOCODE_API_URL = "https://maps.googleapis.com/maps/api/geocode/json"

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

  const coordinates = await fetchCoordinates(location)
  console.log('location',location);
  console.log('coordinates',coordinates.results);
  // Fall back coords
  // let lat = 37.773972;
  // let lon = -122.431297;

  // let lat = coordinates.results.geometry.location.lat
  // let lon = coordinates.results.geometry.location.lng

  // console.log('lat',lat);
  // console.log('lon',lon);

  let lat = coordinates.results[0].geometry.location.lat
  let lon = coordinates.results[0].geometry.location.lng
  console.log('lat, lon',lat, lon);
  // Fetch data
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
    const forecastResponse = (await response.json()) as WeatherResponse;

    // return formatted forecast data json
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
        temp: {
          dayTime: Math.round(day.temp.day)
        },
        dt: day.dt,
        weather: day.weather
      }))
    }, { status: 200 });

  } catch (error) {
    //handle error
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

async function fetchCoordinates(location: string) {
  const sanitizeLocation = encodeURI(location) || "";

  console.log('sanitizeLocation',sanitizeLocation);
  try {
    const response = await fetch(GEOCODE_API_URL + "?" + new URLSearchParams({
      address: sanitizeLocation,
      key: PLACES_API_KEY
    }))

    const coordinates = (await response.json())
    console.log('response',coordinates);

    return coordinates
  } catch (error) {
    console.log('error',error);
    // handle server error
  }
}
