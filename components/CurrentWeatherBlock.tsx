
interface CurrentWeatherProps {
  weather: {
    location: string,
    date: string,
    dayOfWeek: string,
    temperature: string,
    weatherDescription: string
  };
}

export default function CurrentWeather({weather}:CurrentWeatherProps) {
  return (
    <div className="h-[300px] p-7 flex flex-col bg-white">
      <div className="flex-grow">
        <p className="text-2xl font-bold">{weather.dayOfWeek}</p>
        <p>{weather.date}</p>
        <p>{weather.location}</p>
      </div>
      <div className="">
        <p className="text-5xl font-medium">{weather.temperature}</p>
        <p className="font-medium">{weather.weatherDescription}</p>

      </div>
    </div>
  )
}