export interface WeatherResponse {
  lat: number,
  lon: number,
  timezone: string,
  timezone_offset: number,
  current: CurrentProps,
  daily: DailyProps[],
  precipitation: number,
  hourly: {
    pop: number
  }[]
}

export interface CurrentProps {
  location: string,
  dt: number,
  temp: number,
  windSpeed?: number,
  wind_speed?: number,
  humidity: number,
  precipitation?: number,
  weather: WeatherDetailsProps[]
}

export interface DailyProps {
  temp: {
    day: number,
    dayTime?: number,
  },
  dt: number,
  weather: WeatherDetailsProps[],
}


export interface WeatherDetailsProps {
  id: number,
  main: string,
  description: string,
  icon: string
}

export interface WeatherContextProps {
  isLoading: boolean,
  isError: boolean,
  location: string,
  tempUnit: string,
  setTempUnit: (unit: string)=> void,
  setLocation: (unit: string)=> void,
  weather: WeatherResponse
}

export interface ChildrenProps {
  children: React.ReactNode
}