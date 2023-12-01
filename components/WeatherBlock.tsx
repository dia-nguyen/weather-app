
interface WeatherBlockProps {
  realTimeWeather: {
    location: string,
    date: string,
    dayOfWeek: string,
    temperature: string,
    weatherDescription: string
  };
}

export default function WeatherBlock({realTimeWeather}:WeatherBlockProps) {

  return (
    <div>
      <p>{realTimeWeather.location}</p>
      <p>{realTimeWeather.date}</p>
      <p>{realTimeWeather.dayOfWeek}</p>
      <p>{realTimeWeather.temperature}</p>
      <p>{realTimeWeather.weatherDescription}</p>
    </div>
  )
}