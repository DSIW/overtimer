import * as DateFns from "date-fns";

export const SEC = 1000;
export const MIN = 60 * SEC;
export const HOUR = 60 * MIN;
export const WEEK_LIMIT = 8;
export const MONDAY = 1;
const TODAY = new Date();

export function startOfLastWeeks(weeks: number, today = TODAY): Date {
  const recentLimitDate = DateFns.subWeeks(today, weeks);
  return DateFns.startOfWeek(recentLimitDate, { weekStartsOn: MONDAY });
}

export function todayWorkdayEnd() {
  return withTime(new Date(), "17:00:00");
}

export function withTime(date: Date, formattedTime: string) {
  const [hours, minutes, seconds] = formattedTime.split(":");

  let dateWithNewTime = DateFns.parseISO(DateFns.formatISO(date));
  dateWithNewTime = DateFns.setHours(dateWithNewTime, +hours);
  dateWithNewTime = DateFns.setMinutes(dateWithNewTime, +minutes);
  dateWithNewTime = DateFns.setSeconds(dateWithNewTime, +seconds);
  dateWithNewTime = DateFns.setMilliseconds(dateWithNewTime, 0);
  return dateWithNewTime;
}
