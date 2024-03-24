import TimeLog from "./TimeLog";
import { groupBy } from "lodash";
import * as DateFns from "date-fns";

export default class TimeLogCollection {
  constructor(private readonly timeLogs: TimeLog[]) {}

  getAll() {
    return this.timeLogs;
  }

  getStartTimes() {
    return this.timeLogs.map((timeLog) => timeLog.startTime);
  }

  getEndTimes() {
    return this.timeLogs.map((timeLog) => timeLog.endTime || 0);
  }

  groupedByDay() {
    return groupBy(this.timeLogs, (timeLog) => {
      return DateFns.format(timeLog.startTime, "yyyy-MM-dd");
    });
  }

  sorted() {
    return this.timeLogs.sort((a, b) =>
      DateFns.isBefore(a.startTime, b.startTime) ? -1 : 1
    );
  }
}
