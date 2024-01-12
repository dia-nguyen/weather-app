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
  //TODO: fix bug where locations is fetched w/o query
  const { locations, isLoading } = useFetchPlaces(debouncedQuery);
  const { setLocation } = useContext(weatherContext);

  const default_cities = [
    {
      "id": "ChIJOwg_06VPwokRYv534QaPC8g",
      "city": "New York, NY, USA"
    },
    {
      "id": "ChIJE9on3F3HwoAR9AhGJW_fL-I",
      "city": "Los Angeles, CA, USA"
    },
    {
      "id": "ChIJIQBpAG2ahYAR_6128GcTUEo",
      "city": "San Francisco, CA, USA"
    }
  ];

  const handleLocationClick = (description: string, location: {}) => {
    setQuery(description);
    setLocation(location);
  };

  const renderOptions = () => {
    let cities = [];
    if (debouncedQuery.length > 0  && !!locations && locations.length <= 0) {
      // when no locations can be found
      return (
        <Combobox.Option value={null}
          className={`text-sm text-left`}>
          <span>No location found</span>
        </Combobox.Option>
      );
    } else if (locations && locations.length > 0){
      // list of cities from hook
      cities = locations;

    } else {
      // default list of cities
      cities = default_cities
    }

    return (
      cities.map((location) => (
        <Combobox.Option key={location.id} value={location.city} onClick={() =>
          handleLocationClick(location.city, location)}
          className={`text-sm text-left cursor-pointer`}>
          {({ active }) => (
            <span
              className={`block truncate w-full ${active ? "" : "opacity-50"
                }`}
            >
              {location.city}
            </span>
          )}
        </Combobox.Option>
      ))
    );


  };
  return (
    <span className="relative w-full">
      <Combobox value={query} >
        <Combobox.Input onChange={((event) => setQuery(event.target.value))} name="locations"
          className="border-0 pl-4 outline-none w-full bg-transparent border-white "
        />
        <Combobox.Options className="absolute top-10 w-full border bg-[rgba(255,255,255,0.1)] backdrop-blur-sm flex flex-col gap-2 border-white rounded border-opacity-20 p-3">
          {renderOptions()}
        </Combobox.Options>
      </Combobox>
    </span>
  );
}
