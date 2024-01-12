import BackgroundLoader from "./BackgroundLoader";
import CurrentWeather from "./CurrentWeatherBlock";
import CurrentWeatherDetails from "./CurrentWeatherDetails";
import ErrorMessage from "./ErrorMessage";
import UserSettings from "./UserSettings";
import WeeklyForecast from "./WeeklyForecastBlocks";

export default function WeatherAppV2() {

  return (
    <main className="w-full h-screen flex bg-cover bg-center bg-neutral-900">
      <BackgroundLoader size="full"/>

      <div className="m-auto rounded-lg grid grid-cols-2 w-[750px] relative">
        <div className="relative">
          <BackgroundLoader size="small"/>
          <CurrentWeather />
        </div>

        <div className="text-white border-[rgba(255,255,255,0.2)] rounded-r border-t border-r border-b bg-[rgba(255,255,255,0.1)] backdrop-blur-sm p-7 relative flex flex-col gap-5 justify-center text-sm">
        <CurrentWeatherDetails />
        <WeeklyForecast/>
        </div>

      <UserSettings/>

      </div>
      <ErrorMessage/>
    </main>
  );
}
