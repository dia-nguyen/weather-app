/**
 * 3rd party API response types
 */
export interface OpenWeatherResponse {
  lat: number,
  lon: number,
  timezone: string,
  timezone_offset: number,
  current: {
    location: string,
    dt: number,
    temp: number,
    wind_speed: number,
    humidity: number,
    weather: WeatherDetailsProps[];
  },
  daily: {
    temp: {
      day: number,
    },
    dt: number,
    weather: WeatherDetailsProps[],
  }[],
  precipitation: number,
  hourly: {
    pop: number;
  }[];
}

export interface PlacesResponse {
  predictions: PlacesPredictionProps[]
}

export interface PlacesPredictionProps {
  place_id: string,
  description: string;
}

/** Route API response types */

export interface CurrentWeatherProps {
  location: string,
  dt: number,
  temp: number,
  windSpeed: number,
  humidity: number,
  precipitation: number,
  weather: WeatherDetailsProps[];
}

export interface DailyWeatherProps {
  temp: {
    dayTime: number,
  },
  dt: number,
  weather: WeatherDetailsProps[],
}

export interface WeatherResponse {
  current: CurrentWeatherProps,
  daily: DailyWeatherProps[]
}

export interface WeatherDetailsProps {
  id: number,
  main: string,
  description: string,
  icon: string;
}

export interface LocationProps {
  id: string,
  city: string,
}

export interface PredictionProps {
  placeId: string,
  description: string;
}

export interface WeatherContextProps {
  isLoading: boolean,
  isError: boolean,
  location: LocationProps,
  unit: string,
  setUnit: (unit: string) => void,
  setLocation: ({ }) => void,
  weather: WeatherResponse;
}

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface SkeletonDataLoaderProps {
  custom?: string,
  children: string
}