export function toDate(element: string | Date): number {
  return element instanceof Date ? +element : Date.parse(element);
}
export default function isDateBetween(startDate: string | Date, endDate: string | Date, dateCheck: string | Date): boolean {
  return toDate(startDate) <= toDate(dateCheck) && toDate(dateCheck) <= toDate(endDate);
}
export function formatDate(date: Date): string {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) { month = `0${month}`; }
  if (day.length < 2) { day = `0${day}`; }

  return [year, month, day].join('-');
}
