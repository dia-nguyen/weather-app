"use client";

import { useContext } from 'react';
import { weatherContext } from './WeatherContext';
import { UNITS } from '@/app/lib/helpers';

/**
 * UnitToggle Component
 *
 * A component that allows for toggle between metric and imperial units.
 * Displays C or F for units.
 *
 * Data & methods from weather context:
 * - `unit`: unit of measurement ("metric" or "imperial")
 * - `setUnit`: a setter for unit
 */
export default function UnitToggle() {
  const { unit, setUnit } = useContext(weatherContext);

  const handleSetUnit = () => {
    let currentUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(currentUnit);
  }
  const tempUnit = UNITS[unit].temp;

  return (
      <div className='border p-3 rounded-full w-[40px] h-[40px] flex items-center justify-center relative cursor-pointer' onClick={handleSetUnit}>
        °{tempUnit}
      </div>
  );
}