/**
 * Convert UNIX time into human readable format.
 *
 * formatDayOfWeek = Fri
 * fromatDate = Jan 5, 2024
 */
export function formatDayOfWeek(time: number): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short'
  }).format(time * 1000);
}

export function formatDate(time: number): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(time * 1000);
}

export const UNITS = {
  metric: {
    speed: "km/h",
    temp: "C"
  },
  imperial: {
    speed: "mph",
    temp: "F"
  }
};

/** Fetcher helper for useSWR */
export async function fetcher(url: string) {
  const response = await fetch(url);

  // Check for successful HTTP status codes (e.g., 200)
  if (!response.ok) {

    if(response.status === 401) {
      throw new Error("Unauthorized action. API key may be invalid.");

    } else {
      throw new Error(`${response.statusText}`);
    }
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to parse JSON response');
  }
}



/** Converts between celsius and fahrenheit */
export function convertUnit(unit: string, value: number, type: string ) : any {
  let convertedVal: number;

  if (type === "temp") {
    convertedVal = unit === "metric" ? value : (value * 1.8 + 32);
    return Math.round(convertedVal);
  }
  if (type === "speed") {
    convertedVal = unit === "metric" ? value : (value * 0.6214);
    return Math.ceil(convertedVal * 100) / 100;
  }

}
