"use client";

import { useContext, useState } from "react";
import { useFetchPlaces } from "@/app/lib/hooks";
import { Combobox } from "@headlessui/react";
import { useDebounce } from "use-debounce";
import { weatherContext } from "./WeatherContext";

export default function LocationAutocomplete() {
  const [query, setQuery] = useState<string>("");
  // set query to debounce 400ms then call useFetchPlaces hook with debounced query to fetch a list of prediction locations
  const [debouncedQuery] = useDebounce(query, 400);
  const { locations, isLoading } = useFetchPlaces(debouncedQuery);
  const { setLocation } = useContext(weatherContext);

  const default_cities = [
    'New York, NY, USA',
    'Los Angeles, CA, USA',
    'Chicago, IL, USA',
    'Houston, TX, USA',
    'Phoenix, AZ, USA',
  ];

  // create a list of cities from useFetchPlaces hook or fallback on default
  const cities = !!locations && locations.length > 0 ? locations : default_cities;

  const renderOptions = () => {
    return (
      cities.map((location) => (
        <Combobox.Option key={location} value={location} onClick={() => setQuery(location)}
          className={`text-sm text-left`}>
            {({ active }) => (
                <span
                  className={`px-2 block truncate w-full ${
                    active ? "" : "opacity-50"
                  }`}
                >
                  {location}

                </span>
              )}
        </Combobox.Option>
      ))
    )
  }
  return (
    <span className="relative">
      <Combobox value={query}>
        <Combobox.Input onChange={((event) => setQuery(event.target.value))}
          className="border-0 pl-3 outline-none  bg-transparent border-white col-span-3"
        />
        <Combobox.Options className="absolute top-10 w-full border border-white rounded border-opacity-20 p-2 flex flex-col gap-2">
          {renderOptions}
        </Combobox.Options>
      </Combobox>
      <button className='border-l opacity-50 border-white col-span-1 pl-2 text-sm' onClick={()=>setLocation(query)}>update</button>

    </span>
  );
}
