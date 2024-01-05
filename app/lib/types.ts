export interface WeatherResponse {
  lat: number,
  lon: number,
  timezone: string,
  timezone_offset: number,
  current: {
    dt: number,
    temp: number,
    feels_like: number,
    wind_speed: number,
    weather: [
      id: number,
      main: string,
      description: string,
      icon: string
    ]
  },
  daily: DailyProps[]
}

interface DailyProps {
  temp: {
    day: number
  },
  weather: {
    id: number,
    main: string,
    description: string,
    icon: string
  }[],
}

export interface WeatherContextProps {
  isLoading: boolean,
  isError: boolean,
  location: string,
  temp: string,
  weather: WeatherResponse
}

export interface ChildrenProps {
  children: React.ReactNode
}