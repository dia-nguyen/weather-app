/**
 * Convert UNIX time into human readable format.
 *
 * formatDayOfWeek = Fri
 * fromatDate = Jan 5, 2024
 */
export function formatDayOfWeek(time: number): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short'
  }).format(time * 1000)
}

export function formatDate(time: number): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(time * 1000)
}
