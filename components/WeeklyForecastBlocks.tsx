import Image from "next/image";
import { WeatherInfoProps } from "@/app/lib/weather-forecast";

export default function WeeklyForecast({ forecast }: { forecast: { data: WeatherInfoProps[]; isLoading: boolean; }; }) {
  if (forecast.isLoading) {
    return (
      <ForecastSkeleton />
    );
  }

  if (!forecast.isLoading) {
    return (
      <div className="grid grid-cols-6 border rounded-lg  border-[rgba(255,255,255,0.2)]">
        {forecast.data.map((day: WeatherInfoProps, index: any) => (
          <div key={index} className={`p-2 text-center ${index == 0 ? "bg-[rgba(255,255,255,0.2)]" : ""}`}>
            <Image src={`/assets/weather-icons/${day.code}.svg`} width={30} height={30} alt={day.dayOfWeek} className="invert" />
            <p>{day.dayOfWeek}</p>
            <p>{day.temperature}</p>
          </div>
        ))}
      </div>
    );
  }
}

function ForecastSkeleton() {
  return (
    <div className="grid grid-cols-6 border rounded-lg  border-[rgba(255,255,255,0.2)]">
      {Array.from(Array(6), (_, i) => <div className={`p-2 text-center ${i == 0 ? "bg-[rgba(255,255,255,0.2)]" : ""}`} key={i}>
        <span className="relative w-[25px] inline-block before:rounded before:content-[''] before:absolute before:top-0 before:w-full before:left-0 before:bg-[rgba(255,255,255,0.4)] before:backdrop-blur-sm before:h-full"><Image src={`/assets/weather-icons/1001.svg`} width={30} height={30} alt="preview" className="relative opacity-0" /></span>
        <p className="text-transparent w-full relative before:rounded before:content-[''] before:absolute before:top-[15%] before:w-full before:left-0 before:bg-[rgba(255,255,255,0.4)] before:backdrop-blur-sm before:h-[75%]">Day</p>
        <p className="text-transparent w-full relative before:rounded before:content-[''] before:absolute before:top-[15%] before:w-full before:left-0 before:bg-[rgba(255,255,255,0.4)] before:backdrop-blur-sm before:h-[75%]">Temp</p>
      </div>)}
    </div>
  );
}