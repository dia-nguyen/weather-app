"use client";

import { useContext } from 'react';
import { faC, faF } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gsap from 'gsap';
import { weatherContext } from './WeatherContext';
import { UNITS } from '@/app/lib/helpers';

export default function TempUnitUpdater() {
  const { unit, setUnit } = useContext(weatherContext);

  const handleSetUnit = () => {
    let currentUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(currentUnit);
  }

  const tempUnit = UNITS[unit].temp;

  return (
      <div className='border p-3 rounded-full w-[40px] h-[40px] flex items-center justify-center relative' onClick={handleSetUnit}>
        °{tempUnit}
      </div>
  );
}