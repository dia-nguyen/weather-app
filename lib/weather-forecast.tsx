import getCurrentDay, { getCurrentDate } from "@/lib/date";
import { GET } from "@/app/api/weather/weather";

const WEATHER_CODE_DESCRIPTIONS = {
  0: "Unknown",
  1000: "Clear, Sunny",
  1100: "Mostly Clear",
  1101: "Partly Cloudy",
  1102: "Mostly Cloudy",
  1001: "Cloudy",
  2000: "Fog",
  2100: "Light Fog",
  4000: "Drizzle",
  4001: "Rain",
  4200: "Light Rain",
  4201: "Heavy Rain",
  5000: "Snow",
  5001: "Flurries",
  5100: "Light Snow",
  5101: "Heavy Snow",
  6000: "Freezing Drizzle",
  6001: "Freezing Rain",
  6200: "Light Freezing Rain",
  6201: "Heavy Freezing Rain",
  7000: "Ice Pellets",
  7101: "Heavy Ice Pellets",
  7102: "Light Ice Pellets",
  8000: "Thunderstorm"
};

export default async function fetchCurrentWeather(loc:string) {
  const currentWeather = await GET(loc, "realtime");
  const { data, location } = currentWeather

  const currentDay = getCurrentDay(data.time)
  const currentDate = getCurrentDate(data.time)
  const weatherDescription = WEATHER_CODE_DESCRIPTIONS[data.values.weatherCode]

  return {
    date: currentDate,
    dayOfWeek: currentDay,
    location: location.name.split(", ")[0],
    temperature: `${ data.values.temperature}°`,
    weatherDescription: weatherDescription,
    details: {
      precipitation: data.values.precipitationProbability,
      humidity: data.values.humidity,
      windSpeed: data.values.windSpeed
    }
  }
}


export async function fetchWeeklyForecast(loc:string) {
  const forecast = await GET(loc, "forecast");
  const daily = forecast.timelines.daily

  return daily.map((day)=> ({
    date: getCurrentDate(day.time),
    dayOfWeek: getCurrentDay(day.time),
    temperature: `${ day.values.temperatureAvg}°`,
    weatherDescription: WEATHER_CODE_DESCRIPTIONS[day.values.weatherCodeMax]
  }))

}