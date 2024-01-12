"use client";

import { useContext } from "react";
import { weatherContext } from "./WeatherContext";

export default function ErrorMessage(){
  const { error, isLoading } = useContext(weatherContext);

  if(!isLoading && error) {
    return(
      <div className="fixed w-full bottom-10">
        <div className="text-white w-fit m-auto px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.2)] backdrop-blur-lg text-center">{error.message}</div>
      </div>
    )
  }
}