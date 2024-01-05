"use client";


import { weatherContext } from "@/components/WeatherContext";
import { useContext } from "react";

export default function WeatherAppV2() {
  const { isLoading, isError,weather } = useContext(weatherContext);

  // if Error load this error

  return <div>{!isLoading && <div> welcome </div>}</div>;
}
