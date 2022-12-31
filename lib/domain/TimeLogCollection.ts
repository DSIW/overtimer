import TimeLog from "./TimeLog";
import { groupBy } from "lodash";
import { format, isBefore } from "date-fns";

export default class TimeLogCollection {
  constructor(private readonly timeLogs: TimeLog[]) {}

  getStartTimes() {
    return this.timeLogs.map((timeLog) => timeLog.startTime);
  }

  getEndTimes() {
    return this.timeLogs.map((timeLog) => timeLog.endTime || 0);
  }

  groupedByDay() {
    return groupBy(this.timeLogs, (timeLog) => {
      return format(timeLog.startTime, "yyyy-MM-dd");
    });
  }

  sorted() {
    return this.timeLogs.sort((a, b) =>
      isBefore(a.startTime, b.startTime) ? -1 : 1
    );
  }
}
