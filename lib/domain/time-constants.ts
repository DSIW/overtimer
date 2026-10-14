import * as DateFns from "date-fns";

export const SEC = 1000;
export const MIN = 60 * SEC;
export const HOUR = 60 * MIN;
export const MONDAY = 1;
const TODAY = new Date();

export type TimeRangeOption =
  | { id: string; label: string; kind: "weeks"; weeks: number }
  | { id: string; label: string; kind: "yearToDate" }
  | { id: string; label: string; kind: "quarter"; quarter: 1 | 2 | 3 | 4 };

export const TIME_RANGE_OPTIONS: TimeRangeOption[] = [
  { id: "w4", label: "last 4w", kind: "weeks", weeks: 4 },
  { id: "w8", label: "last 8w", kind: "weeks", weeks: 8 },
  { id: "w12", label: "last 12w", kind: "weeks", weeks: 12 },
  { id: "w26", label: "last 26w", kind: "weeks", weeks: 26 },
  { id: "w52", label: "last 52w", kind: "weeks", weeks: 52 },
  { id: "ytd", label: "this year", kind: "yearToDate" },
  { id: "q1", label: "Q1", kind: "quarter", quarter: 1 },
  { id: "q2", label: "Q2", kind: "quarter", quarter: 2 },
  { id: "q3", label: "Q3", kind: "quarter", quarter: 3 },
  { id: "q4", label: "Q4", kind: "quarter", quarter: 4 },
];

export const DEFAULT_TIME_RANGE_OPTION_ID = "w8";

export function visibleTimeRangeOptions(today = TODAY): TimeRangeOption[] {
  const currentQuarter = DateFns.getQuarter(today);
  return TIME_RANGE_OPTIONS.filter(
    (option) => option.kind !== "quarter" || option.quarter <= currentQuarter
  );
}

export function startOfLastWeeks(weeks: number, today = TODAY): Date {
  const recentLimitDate = DateFns.subWeeks(today, weeks);
  return DateFns.startOfWeek(recentLimitDate, { weekStartsOn: MONDAY });
}

export function startOfTimeRange(
  optionId: string = DEFAULT_TIME_RANGE_OPTION_ID,
  today = TODAY
): Date {
  const option =
    TIME_RANGE_OPTIONS.find((candidate) => candidate.id === optionId) ??
    TIME_RANGE_OPTIONS.find(
      (candidate) => candidate.id === DEFAULT_TIME_RANGE_OPTION_ID
    )!;

  switch (option.kind) {
    case "weeks":
      return startOfLastWeeks(option.weeks, today);
    case "yearToDate":
      return DateFns.startOfYear(today);
    case "quarter":
      return DateFns.startOfQuarter(DateFns.setQuarter(today, option.quarter));
  }
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
