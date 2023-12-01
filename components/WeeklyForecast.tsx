import Image from "next/image"

export default function WeeklyForecast({forecast}) {
  console.log('forecast',forecast);
  return (
    <div className="grid grid-cols-6 border rounded-lg  border-[rgba(255,255,255,0.2)]">
      {forecast.map((day:string, index:any) => (
          <div key={index} className={`p-2 text-center ${index == 0 ? "bg-[rgba(255,255,255,0.2)]": ""}`}>
            <Image src={`/assets/weather-icons/${day.code}.svg`} width={30} height={30} alt={day.dayOfWeek} className="invert" />
            <p>{day.dayOfWeek}</p>
            <p>{day.temperature}</p>
          </div>
        ))}
    </div>
  )
}