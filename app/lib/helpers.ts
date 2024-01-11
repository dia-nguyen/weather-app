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
export async function fetcher<T>(url: string): Promise<T> {
  return await fetch(url).then((res) => res.json())
}
