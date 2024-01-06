import CurrentWeather from "./CurrentWeatherBlock";
import CurrentWeatherDetails from "./CurrentWeatherDetails";
import UserSettings from "./UserSettings";
import WeeklyForecast from "./WeeklyForecastBlocks";

export default function WeatherAppV2() {
  return (
    <main className=" w-full h-screen flex  bg-cover bg-center bg-black" >
      <div className=" m-auto rounded-lg grid grid-cols-2 w-[750px] relative overflow-hidden shadow-lg">
        <div className="relative">
          <div className="absolute w-full h-full top-0 opacity-70 bg-cover bg-center rounded-l"></div>
          <CurrentWeather />
        </div>

        <div className="text-white border-[rgba(255,255,255,0.2)] rounded-r border-t border-r border-b bg-[rgba(255,255,255,0.1)] backdrop-blur-sm p-7 relative flex flex-col gap-5 justify-center text-sm">
        <CurrentWeatherDetails />
        <WeeklyForecast/>
        </div>

      <UserSettings/>

      </div>
    </main>
  );
}
