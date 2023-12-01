import Image from "next/image"
import { WeatherInfoProps } from "@/lib/weather-forecast"

interface ForecastWeatherProps {
  forecast: WeatherInfoProps[];
}

export default function WeeklyForecast({forecast}:ForecastWeatherProps) {
  return (
    <div className="grid grid-cols-6 border rounded-lg  border-[rgba(255,255,255,0.2)]">
      {forecast.map((day:WeatherInfoProps, index:any) => (
          <div key={index} className={`p-2 text-center ${index == 0 ? "bg-[rgba(255,255,255,0.2)]": ""}`}>
            <Image src={`/assets/weather-icons/${day.code}.svg`} width={30} height={30} alt={day.dayOfWeek} className="invert" />
            <p>{day.dayOfWeek}</p>
            <p>{day.temperature}</p>
          </div>
        ))}
    </div>
  )
}