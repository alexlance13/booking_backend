export function toDate(element: string | Date): number {
  return element instanceof Date ? +element : Date.parse(element);
}
export default function isDateBetween(startDate: string | Date, endDate: string | Date, dateCheck: string | Date): boolean {
  return toDate(startDate) <= toDate(dateCheck) && toDate(dateCheck) <= toDate(endDate);
}
