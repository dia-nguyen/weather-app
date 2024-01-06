import WeatherProvider from "@/components/WeatherProvider";
import WeatherAppV2 from "../components/WeatherAppV2";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;


export default function App() {
  return <WeatherProvider><WeatherAppV2/></WeatherProvider>;
}
