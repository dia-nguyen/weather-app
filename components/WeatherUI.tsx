"use client";

import LocationInput from "./LocationInput";
import { useEffect, useState } from "react";


export default function WeatherUI() {
  const [location, setLocation] = useState("");

  return (
    <div className="border m-auto rounded-lg grid grid-cols-2 w-[600px]">
      {/* <LocationInput handleClick={setLocation}/> */}
      <div className="h-[300px] grid p-7">
        <div>
          <p>Tuesday</p>
          <p>15 Jan 2019</p>
          <p>Vancouver</p>
        </div>

        <div>
          <p className="text-6xl">29 C</p>
          <p>Sunny</p>
        </div>

      </div>
      <div className="bg-gray-300 p-7">
        <div className="w-full grid grid-cols-2">
          <span>Precipitation:</span> <span className="text-right">0%</span>

        </div>

        <div className="grid grid-cols-4 my-3 border rounded-lg">
          <div className="bg-white p-2 text-center">
            <p>Tues</p>
            <p>29C</p>
          </div>
          <div className="p-2 text-center">
            <p>Tues</p>
            <p>29C</p>
          </div>
          <div className="p-2 text-center">
            <p>Tues</p>
            <p>29C</p>
          </div>
          <div className="p-2 text-center">
            <p>Tues</p>
            <p>29C</p>
          </div>

        </div>
        <div className="text-sm border w-full px-1 py-2 rounded-full text-center">Change Location</div>
      </div>
    </div>
  )
}