import { GET } from "@/app/api/weather/weather";

export default async function fetchCurrentWeather(loc:string) {
  const currentWeather = await GET(loc, "realtime");
  const { data, location } = currentWeather

  return {
    time: data.time,
    location: location.name,
    temperature: data.values.temperature,
  }
}