import TimeLog from "./TimeLog";
import { format, isSameDay, max, min } from "date-fns";
import TimeLogCollection from "./TimeLogCollection";
import { sum } from "lodash";
import { HOUR } from "./time-constants";

const HOUR_LIMIT = 8 * HOUR;

export type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export default class Workday {
  private collection: TimeLogCollection;

  constructor(private readonly timeLogs: TimeLog[]) {
    this.validate(timeLogs);
    this.collection = new TimeLogCollection(timeLogs);
  }

  static fromTimeLogs(timeLogs: TimeLog[]): Workday[] {
    const groups = new TimeLogCollection(timeLogs).groupedByDay();

    return Object.entries(groups).map(([_date, timeLogs]) => {
      return new Workday(timeLogs);
    });
  }

  getWeekday(): Weekday {
    return format(this.timeLogs[0].startTime, "EEEE") as Weekday;
  }

  getStartTime() {
    return min(this.collection.getStartTimes());
  }

  getEndTime() {
    return max(this.collection.getEndTimes());
  }

  getTotalWorkTimeMs(): number {
    return sum(this.collection.getAll().map((it) => it.getDurationMs()));
  }

  getCappedTotalWorkTimeMs(): number {
    return Math.min(this.getTotalWorkTimeMs(), HOUR_LIMIT);
  }

  getOvertimeMs(): number {
    return Math.max(this.getTotalWorkTimeMs() - HOUR_LIMIT, 0);
  }

  getPauseMs() {
    const sorted = this.collection.sorted();

    let sum = 0;
    for (let i = 1; i < sorted.length; i++) {
      const currentTimeLog = sorted[i];
      const prevTimeLog = sorted[i - 1];

      const endTime = prevTimeLog.endTime;
      if (endTime === undefined) {
        throw new Error(
          "Pause can only be calculated if previous timelog is done"
        );
      }

      sum = sum + +currentTimeLog.startTime - +endTime;
    }

    return sum;
  }

  private validate(timeLogs: TimeLog[]) {
    if (timeLogs.length === 0) {
      throw new Error(`Workday can't be created, because timelogs are empty`);
    }

    if (!timeLogs.every((timeLog) => timeLog.isDone())) {
      throw new Error(
        `Workday can't be created, because some timelog is running`
      );
    }

    const startTimes = this.timeLogs.map((timeLogs) => timeLogs.startTime);
    if (
      !startTimes.every((timeLog) => isSameDay(timeLog, timeLogs[0].startTime))
    ) {
      throw new Error(
        `Workday can't be created, because multiple days are used`
      );
    }
  }
}
