
interface CurrentWeatherDetailsProps {
  details: {
    precipitation: number,
    humidity: number,
    windSpeed: number,
  };
}

export default function CurrentWeatherDetails ({details} : CurrentWeatherDetailsProps) {
  return (
    <div className="w-full grid grid-cols-2">
      <span>Precipitation:</span> <span className="text-right">{details.precipitation}%</span>
      <span>Humidity:</span> <span className="text-right">{details.humidity}%</span>
      <span>Wind:</span> <span className="text-right">{details.windSpeed} km/h</span>
    </div>
  )
}