"use client";

import { useRef, useState } from 'react';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gsap from 'gsap';
import LocationAutocomplete from './LocationAutocomplete';

export default function LocationUpdater() {
  const [showLocationInput, setShowLocationInput] = useState<boolean>(false);
  const locationBtn = useRef(null);

  const toggleInput = () => {
    if (locationBtn.current) {
    if (showLocationInput) {
        gsap.to(locationBtn.current, { width: 40, duration: 0.5 });
        setShowLocationInput(false);
      } else {
        gsap.to(locationBtn.current, { width: 300, duration: 0.5 });
        setTimeout(() => {
          setShowLocationInput(true);
        }, 500);
      }
    }
  };

  return (
    <div className='border p-3 rounded-full w-[40px] h-[40px]' ref={locationBtn}>
      <div className='h-full relative flex items-center'>
        <FontAwesomeIcon className='z-10 cursor-pointer' icon={faLocationArrow} onClick={toggleInput} />
        {showLocationInput && <LocationAutocomplete />}
      </div>
    </div>
  );
}

