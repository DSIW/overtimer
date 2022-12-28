import TimeLog from "./TimeLog";
import { format, isSameDay, max, min } from "date-fns";
import TimeLogCollection from "./TimeLogCollection";

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

  getWeekday() {
    return format(this.timeLogs[0].startTime, "EEEE");
  }

  getStartTime() {
    return min(this.collection.getStartTimes());
  }

  getEndTime() {
    return max(this.collection.getEndTimes());
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
