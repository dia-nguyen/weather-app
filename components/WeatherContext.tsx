import { createContext } from "react";
import { WeatherContextProps } from "@/app/lib/types";

export const weatherContext = createContext({} as WeatherContextProps);