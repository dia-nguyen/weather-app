"use client";

import { useContext } from "react";
import { weatherContext } from "./WeatherContext";

export default function BackgroundLoader({ size }) {
  const { photos, isLoading } = useContext(weatherContext);

    if (size === "small") {
      return (
        <div className={`${isLoading ? "opacity-0" : "opacity-80"}  ease-out transition-opacity duration-500 absolute w-full h-full top-0 bg-cover bg-center rounded-l`} style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.2)), url(${photos?.regular})` }}></div>
      );
    }

    if (size === "full") {
      return (<div className={`${isLoading ? "opacity-0" : "opacity-80"} transition-opacity ease-out duration-500  fixed w-full h-full bg-cover bg-center`} style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${photos?.full})` }} />);
    }

    //TODO: fix flickering of photos fading in. Maybe use regular photo size for both instances?
}