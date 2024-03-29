import BackgroundLoader from "./BackgroundLoader";
import CurrentWeather from "./CurrentWeather";
import CurrentWeatherDetails from "./CurrentWeatherDetails";
import ErrorMessage from "./ErrorMessage";
import UserSettings from "./UserSettings";
import WeeklyForecast from "./WeeklyForecast";

/**
 * WeatherApp Component
 *
 * Main interface component of the weather app that displays weather forecast related components
 *
 * Components Rendered:
 * - CurrentWeather: Displays current location's weather information
 * - CurrentWeatherDetails: Displays additional details for current location's weather
 * - WeeklyForecast: Displays current location's weekly forecast
 * - UserSettings: Displays user setting locations including location input and unit toggler
 * - BackgroundLoader: Loads background photo relating to current location
 */
export default function WeatherApp() {
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
