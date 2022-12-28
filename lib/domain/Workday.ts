import TimeLog from "./TimeLog";
import { format, isSameDay, min } from "date-fns";

export default class Workday {
  constructor(private readonly timeLogs: TimeLog[]) {
    this.validate(timeLogs);
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

  private validate(timeLogs: TimeLog[]) {
    if (timeLogs.length === 0) {
      throw new Error(`Workday can't be created, because timelogs are empty`)
    }

    if (!timeLogs.every((timeLog) => timeLog.isDone())) {
      throw new Error(`Workday can't be created, because some timelog is running`)
    }

    const startTimes = this.timeLogs.map(timeLogs => timeLogs.startTime);
    if (!startTimes.every(timeLog => isSameDay(timeLog, timeLogs[0].startTime))) {
      throw new Error(`Workday can't be created, because multiple days are used`)
    }
  }
}
