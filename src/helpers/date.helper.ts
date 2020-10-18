export function toDate(element: string | Date): number {
  return element instanceof Date ? +element : Date.parse(element);
}
export default function isDateBetween(dateStart: string | Date, dateEnd: string | Date, dateCheck: string | Date): boolean {
  return toDate(dateStart) <= toDate(dateCheck) && toDate(dateCheck) <= toDate(dateEnd);
}
