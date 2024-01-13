import WeatherProvider from "@/components/WeatherProvider";
import WeatherApp from "../components/WeatherApp";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export default function App() {
  return <WeatherProvider><WeatherApp/></WeatherProvider>;
}
