import { getDay, nextMonday, nextSunday, subDays, subWeeks } from "date-fns";

export const SEC = 1000;
export const MIN = 60 * SEC;
export const HOUR = 60 * MIN;
export const TODAY = new Date();
export const NOW = new Date();
export const YESTERDAY = subDays(TODAY, 1);

export function lastMonday() {
  return lastWeekday(1, nextMonday);
}

export function lastSunday() {
  return lastWeekday(0, nextSunday);
}

function lastWeekday(dayIndex: number, nextMethod: (date: Date) => Date) {
  if (getDay(TODAY) === dayIndex) {
    return subWeeks(TODAY, 1);
  }

  const day = subWeeks(nextMethod(TODAY), 1);

  if (getDay(day) !== dayIndex) {
    throw new Error("no correct week day");
  }

  return day;
}
