import TimeLog from "./TimeLog";
import { format, min } from "date-fns";

export default class Workday {
  constructor(private readonly timeLogs: TimeLog[]) {
  }

  getWeekday() {
    return format(this.timeLogs[0].startTime, "EEEE");
  }

  getStartTime() {
    return min(this.getStartTimes());
  }

  getFormattedStartTime() {
    return format(this.getStartTime(), "HH:mm:ss");
  }

  private getStartTimes() {
    return this.timeLogs.map((timeLog) => timeLog.startTime);
  }
}
