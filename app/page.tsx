import { useEffect, useState } from "react";
import { GET } from "./api/weather/weather";
import Weather from "@/components/Weather";
import WeatherUI from "@/components/WeatherUI";

export default async function Home() {
  return (
    <main className=" w-full h-screen grid bg-gray-700">
      <Weather/>
    </main>
  )
}
