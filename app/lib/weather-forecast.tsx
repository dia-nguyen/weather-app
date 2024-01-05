import getCurrentDay, { getCurrentDate } from "@/app/lib/date";
import { fetchWeatherData } from "@/app/api/weather-deprecated/weather";

export default async function fetchCurrentWeather(loc:string) {
  const currentWeather = await fetchWeatherData(loc, "realtime") as CurrentWeatherProps | undefined;

  if(!currentWeather) {
    /**handle error */
    throw new Error("Weather data not available");
  }
  const { data, location } = currentWeather

  const currentDay = getCurrentDay(data.time)
  const currentDate = getCurrentDate(data.time)
  const weatherCode = data.values.weatherCode;
  const weatherDescription = WEATHER_CODE_DESCRIPTIONS[String(weatherCode)];


  return {
    date: currentDate,
    dayOfWeek: currentDay,
    location: location.name.split(", ")[0],
    temperature: `${ data.values.temperature}°`,
    description: weatherDescription,
    code: data.values.weatherCode,
    details: {
      precipitation: data.values.precipitationProbability,
      humidity: data.values.humidity,
      windSpeed: data.values.windSpeed
    }
  }
}

export async function fetchWeeklyForecast(loc:string) {
  const forecast = await fetchWeatherData(loc, "forecast") as WeatherTimelineProps | undefined;

  if(!forecast) {
    /**handle error */
    throw new Error("Weather data not available");
  }

  const daily = forecast.timelines.daily


  return daily.map((day)=> ({
    date: getCurrentDate(day.time),
    dayOfWeek: getCurrentDay(day.time),
    temperature: `${ day.values.temperatureAvg}°`,
    description: WEATHER_CODE_DESCRIPTIONS[day.values.weatherCodeMax],
    code: day.values.weatherCodeMax
  }))

}


const WEATHER_CODE_DESCRIPTIONS : { [key: string]: string} = {
  "0": "Unknown",
  "1000": "Clear, Sunny",
  "1100": "Mostly Clear",
  "1101": "Partly Cloudy",
  "1102": "Mostly Cloudy",
  "1001": "Cloudy",
  "2000": "Fog",
  "2100": "Light Fog",
  "4000": "Drizzle",
  "4001": "Rain",
  "4200": "Light Rain",
  "4201": "Heavy Rain",
  "5000": "Snow",
  "5001": "Flurries",
  "5100": "Light Snow",
  "5101": "Heavy Snow",
  "6000": "Freezing Drizzle",
  "6001": "Freezing Rain",
  "6200": "Light Freezing Rain",
  "6201": "Heavy Freezing Rain",
  "7000": "Ice Pellets",
  "7101": "Heavy Ice Pellets",
  "7102": "Light Ice Pellets",
  "8000": "Thunderstorm"
};

interface WeatherValues {
  cloudBase: number
  humidity:number
  precipitationProbability: number
  temperature: number
  visibility: number
  weatherCode: number
  windGust: number
  windSpeed: number
  temperatureAvg?: number
  weatherCodeMax: number
}

interface LocationTypes {
  lat: number;
  lon: number;
  name: string;
  type: string;
}

interface CurrentWeatherProps {
  data: {
    time: string;
    values: WeatherValues;
  };
  location: LocationTypes;
}

export interface WeatherTimelineProps {
  timelines: {
    daily: Array<{
      time: string;
      values: WeatherValues;
    }>;
  };
  location: LocationTypes;
}

export interface WeatherDetailsProps extends WeatherInfoProps {
  location: string;
  details: {
    precipitation: number;
    humidity: number;
    windSpeed: number;
  };
}

export interface WeatherInfoProps {
  date: string;
  dayOfWeek: string;
  temperature: string;
  description: string;
  code: number;
}

export interface ForecastProps {
  data: WeatherInfoProps[],
  isLoading: boolean,
  errorMsg: string,
}

export interface RealTimeWeatherProps {
  data: WeatherDetailsProps,
  isLoading: boolean,
  errorMsg: string,
}




