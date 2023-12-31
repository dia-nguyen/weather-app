
interface CurrentWeatherDetailsProps {
  precipitation: number,
  humidity: number,
  windSpeed: number,
}


export default function CurrentWeatherDetails({ weather }: { weather: { data: { details: CurrentWeatherDetailsProps; }; isLoading: boolean; }; }) {
  const { details } = weather.data;
  if (weather.isLoading) {
    return (
      <div className="w-full">
        <SkeletonDetailsLoader>Precipitation</SkeletonDetailsLoader>
        <SkeletonDetailsLoader>Humidity</SkeletonDetailsLoader>
        <SkeletonDetailsLoader>WindSpeed</SkeletonDetailsLoader>
      </div>
    );
  } if (!weather.isLoading) {
    return (
      <div className="w-full grid grid-cols-2">
        <span>Precipitation:</span> <span className="text-right">{details.precipitation}%</span>
        <span>Humidity:</span> <span className="text-right">{details.humidity}%</span>
        <span>Wind:</span> <span className="text-right">{details.windSpeed} km/h</span>
      </div>
    );
  }
}

function SkeletonDetailsLoader({ children }: {children: string}) {
  return (
    <div className={`w-full text-transparent relative before:rounded before:content-[''] before:absolute before:top-[15%] before:w-full before:left-0 before:bg-[rgba(255,255,255,0.4)] before:backdrop-blur-sm before:h-[75%]`}>{children}</div>
  );
}