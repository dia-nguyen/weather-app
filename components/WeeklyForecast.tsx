
export default function WeeklyForecast({forecast}) {
  return (
    <div className="grid grid-cols-6 border rounded-lg">
      {forecast.map((day:string, index:any) => (
          <div key={index} className={`p-2 text-center ${index == 0 ? "bg-white": ""}`}>
            <p>{day.dayOfWeek}</p>
            <p>{day.temperature}</p>
          </div>
        ))}
    </div>
  )
}