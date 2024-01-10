"use client";

import { useContext, useRef, useState } from 'react';
import { faC, faF } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gsap from 'gsap';
import { weatherContext } from './WeatherContext';

export default function TempUnitUpdater() {
  const [showLocationInput, setShowLocationInput] = useState<boolean>(false);

  const { tempUnit, setTempUnit } = useContext(weatherContext);

  const handleSetUnit = () => {
    let unit = tempUnit === "C" ? "F" : "C"

    setTempUnit(unit)
  }

  return (
      <div className='border p-3 rounded-full w-[40px] h-[40px] flex items-center justify-center relative' onClick={handleSetUnit}>
        °{tempUnit}
      </div>
  );
}