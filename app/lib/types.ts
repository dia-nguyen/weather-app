/**
 * 3rd party API response types
 */
export interface OpenWeatherResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: {
    location: string;
    dt: number;
    temp: number;
    wind_speed: number;
    humidity: number;
    weather: WeatherDetailsProps[];
  };
  daily: {
    temp: {
      day: number;
    };
    dt: number;
    weather: WeatherDetailsProps[];
  }[];
  precipitation: number;
  hourly: {
    pop: number;
  }[];
  status: number;
  statusText: string;
}

export interface PlacesResponse {
  predictions: PlacesPredictionProps[],
  status: number;
  statusText: string;
}

export interface PlacesPredictionProps {
  place_id: string;
  description: string;
}


export interface UnsplashResponse {
  results: {
    urls: PhotoSizesProps
  }[],
  status: number;
  statusText: string;
}

/** Route API response types */

export interface CurrentWeatherProps {
  location: string;
  dt: number;
  temp: number;
  windSpeed: number;
  humidity: number;
  precipitation: number;
  weather: WeatherDetailsProps[];
}

export interface DailyWeatherProps {
  temp: {
    dayTime: number;
  };
  dt: number;
  weather: WeatherDetailsProps[];
}

export interface WeatherResponse {
  current: CurrentWeatherProps;
  daily: DailyWeatherProps[]
}

export interface WeatherDetailsProps {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface LocationProps {
  id: string;
  city: string;
}

export interface PredictionProps {
  placeId: string;
  description: string;
}

export interface WeatherContextProps {
  isLoading: boolean;
  error: {
    message: string
  };
  photosIsLoading: boolean;
  photosError: {
    message: string
  };
  location: LocationProps;
  unit: string;
  setUnit: (unit: string) => void;
  setLocation: ({ }) => void;
  weather: WeatherResponse;
  photos: PhotoSizesProps;
}

export interface PhotoSizesProps {
  full: string,
  regular: string,
}

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface WeatherDataSkeletonProps {
  customStyle?: string;
  children: string
}