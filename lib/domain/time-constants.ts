import {
  formatISO,
  parseISO,
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

export function startOfLastWeeks(weeks: number, today = TODAY): Date {
  const recentLimitDate = subWeeks(today, weeks);
  const MONDAY = 1;
  return startOfWeek(recentLimitDate, { weekStartsOn: MONDAY });
}

export function todayWorkdayEnd() {
  return withTime(new Date(), "17:00:00");
}

export function withTime(date: Date, formattedTime: string) {
  const [hours, minutes, seconds] = formattedTime.split(":");

  let dateWithNewTime = parseISO(formatISO(date));
  dateWithNewTime = setHours(dateWithNewTime, +hours);
  dateWithNewTime = setMinutes(dateWithNewTime, +minutes);
  dateWithNewTime = setSeconds(dateWithNewTime, +seconds);
  dateWithNewTime = setMilliseconds(dateWithNewTime, 0);
  return dateWithNewTime;
}
