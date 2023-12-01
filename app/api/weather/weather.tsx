import { NextResponse } from "next/server";
const WEATHER_URL = "https://api.tomorrow.io/v4/weather"
const WEATHER_API_KEY = "Dwjbgs39bUV0xPUN9waZ285IuXkLY6Re"

export async function GET(location:string, type:string) {
  if(location) {
    const url = `${WEATHER_URL}/${type}?location=${location}&apikey=${WEATHER_API_KEY}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error("oops")
    }

    return await response.json()
  }
}