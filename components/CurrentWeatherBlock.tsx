import Image from "next/image";

interface CurrentWeatherProps {
  location: string,
  date: string,
  dayOfWeek: string,
  temperature: string,
  description: string
  code: number
}

export default function CurrentWeather({ weather }: { weather: { data: CurrentWeatherProps; isLoading: boolean, errorMsg: string } }) {
  if(weather.isLoading) {
    return (
      <div className="h-[300px] p-7 flex flex-col bg-whiten z-10 relative text-transparent">
        <div className="flex-grow">
          <SkeletonDataLoader custom={"text-2xl"}>day</SkeletonDataLoader>
          <SkeletonDataLoader>Date</SkeletonDataLoader>
          <SkeletonDataLoader>Location</SkeletonDataLoader>
        </div>
        <div>
          <SkeletonIconLoader/>
          <SkeletonDataLoader custom={"text-5xl font-medium"}>Temp</SkeletonDataLoader>
          <SkeletonDataLoader custom={"font-medium"}>Description</SkeletonDataLoader>
        </div>
      </div>
    )
  }

  if(!weather.isLoading) {
    return (
      <div className="h-[300px] p-7 flex flex-col bg-whiten z-10 relative text-white ">
        <div className="flex-grow">
          <p className="text-2xl font-bold text-shadow-sm">{weather.data.dayOfWeek}</p>
          <p>{weather.data.date}</p>
          <p>{weather.data.location}</p>
        </div>
        <div>
          <Image src={`/assets/weather-icons/${weather.data.code}.svg`} width={50} height={50} alt={weather.data.dayOfWeek} className="invert"/>
          <p className="text-5xl font-medium">{weather.data.temperature}</p>
          <p className="font-medium">{weather.data.description}</p>

        </div>
      </div>
    )
  }


}

function SkeletonDataLoader({custom,children}:SkeletonDataLoaderProps) {
  return(
    <p className={`${custom} text-shadow-sm  w-fit relative before:rounded before:content-[''] before:absolute before:top-[15%] before:w-full before:left-0 before:bg-[rgba(255,255,255,0.4)] before:backdrop-blur-sm before:h-[75%]`}>{children}</p>
  )
}

function SkeletonIconLoader() {
  return(
    <span className="relative w-[50px] inline-block before:rounded before:content-[''] before:absolute before:top-0 before:w-full before:left-0 before:bg-[rgba(255,255,255,0.4)] before:backdrop-blur-sm before:h-full"><Image src={`/assets/weather-icons/1001.svg`} width={50} height={50} alt="preview" className="relative opacity-0"/></span>
  )
}

interface SkeletonDataLoaderProps {
  custom?: string,
  children: string
}