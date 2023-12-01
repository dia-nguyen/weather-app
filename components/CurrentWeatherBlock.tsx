import Image from "next/image";

interface CurrentWeatherProps {
  weather: {
    location: string,
    date: string,
    dayOfWeek: string,
    temperature: string,
    description: string
    code: number
  };
}

export default function CurrentWeather({weather}:CurrentWeatherProps) {
  return (
    <div className="h-[300px] p-7 flex flex-col bg-whiten z-10 relative text-white ">
      <div className="flex-grow">
        <p className="text-2xl font-bold text-shadow-sm">{weather.dayOfWeek}</p>
        <p>{weather.date}</p>
        <p>{weather.location}</p>
      </div>
      <div className="">
        <Image src={`/assets/weather-icons/${weather.code}.svg`} width={50} height={50} alt={weather.dayOfWeek} className="invert"/>
        <p className="text-5xl font-medium">{weather.temperature}</p>
        <p className="font-medium">{weather.description}</p>

      </div>
    </div>
  )
}
