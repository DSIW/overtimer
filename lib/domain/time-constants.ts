import {
  getDay,
  nextMonday,
  nextSunday,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
  startOfWeek,
  subWeeks,
} from "date-fns";

export const SEC = 1000;
export const MIN = 60 * SEC;
export const HOUR = 60 * MIN;
export const WEEK_LIMIT = 8;
const TODAY = new Date();

export function lastMonday() {
  return lastWeekday(1, nextMonday);
}

export function lastSunday() {
  return lastWeekday(0, nextSunday);
}

export function startOfLastWeeks(weeks: number, today = TODAY): Date {
  const recentLimitDate = subWeeks(today, weeks);
  const MONDAY = 1;
  return startOfWeek(recentLimitDate, { weekStartsOn: MONDAY });
}

export function todayWorkdayStart() {
  return _setTime(new Date(), "09:00:00");
}

export function todayWorkdayEnd() {
  return _setTime(new Date(), "17:00:00");
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

function _setTime(date: Date, formattedTime: string) {
  const [hours, minutes, seconds] = formattedTime.split(":");

  let dateWithNewTime = date;
  dateWithNewTime = setHours(dateWithNewTime, +hours);
  dateWithNewTime = setMinutes(dateWithNewTime, +minutes);
  dateWithNewTime = setSeconds(dateWithNewTime, +seconds);
  dateWithNewTime = setMilliseconds(dateWithNewTime, 0);
  return dateWithNewTime;
}
