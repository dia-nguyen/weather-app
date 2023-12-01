const DAYS_OF_WEEK = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

export default function getCurrentDay(date:string) {
  const currentDate = new Date(date);

  return DAYS_OF_WEEK[currentDate.getDay()]
}

export function getCurrentDate(date:string) {
  const currentDate = new Date(date);
  return currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

}
