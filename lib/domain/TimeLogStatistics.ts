import TimeLog from "./TimeLog";
import { format, isSameDay, isSameWeek } from "date-fns";
import { HOUR, MONDAY } from "./time-constants";

const WORK_HOURS = 8;
const WORK_HOURS_MS = WORK_HOURS * HOUR;

export default class TimeLogStatistics {
  constructor(
    private readonly timeLogs: TimeLog[],
    private readonly nowDate: Date = new Date()
  ) {
    this.isToday = this.isToday.bind(this);
    this.isNotToday = this.isNotToday.bind(this);
  }

  getTotalOvertimeMs() {
    return this.getOvertimeUntilYesterday() + this.getOvertimeFromToday();
  }

  getWeeklyOvertimeMs() {
    const thisWeekTimeLogs = this.timeLogs.filter((timeLog) =>
      this.isThisWeek(timeLog)
    );
    return new TimeLogStatistics(thisWeekTimeLogs).getTotalOvertimeMs();
  }

  getTimerValues() {
    const currentTimeLog = this.timeLogs[0];

    const totalWorkTimeMs = this.getTotalWorkTimeMs();
    const workTimeMs = this.getCurrentWorkTimeMs();

    const isOverdue = workTimeMs <= 0;

    const value = Math.abs(workTimeMs);

    const isRunning = currentTimeLog?.isRunning() || false;

    const percentage = isOverdue ? 100 : (value / totalWorkTimeMs) * 100;

    return {
      isRunning,
      value,
      percentage,
      isOverdue,
    };
  }

  getDays() {
    const formattedTimeLogs = this.timeLogs.map((timeLog) =>
      format(timeLog.startTime, "yyyy-MM-dd")
    );
    return new Set(formattedTimeLogs).size;
  }

  private getOvertimeUntilYesterday(): number {
    const oldTimeLogs = this.timeLogs
      .filter(this.isDone)
      .filter(this.isNotToday);

    return this.calcOvertimeMs(oldTimeLogs);
  }

  private getOvertimeFromToday(): number {
    const todayTimeLogs = this.timeLogs.filter(this.isToday);
    const todayOvertime = this.calcOvertimeMs(todayTimeLogs);

    return Math.max(0, todayOvertime);
  }

  private getTotalWorkTimeMs() {
    return WORK_HOURS_MS;
  }

  private getTotalDuration() {
    return this.timeLogs.map((timeLog) => timeLog.getDurationMs());
  }

  private isDone(timeLog: TimeLog): boolean {
    return timeLog.isDone();
  }

  private calcOvertimeMs(timeLogs: TimeLog[]) {
    const todayTimeLogs = timeLogs;
    const todayTimeLogStatistics = new TimeLogStatistics(todayTimeLogs);
    const durations = todayTimeLogStatistics.getTotalDuration();
    const days = todayTimeLogStatistics.getDays();

    const totalDuration = this.sum(durations);
    return totalDuration - days * this.getTotalWorkTimeMs();
  }

  private getCurrentWorkTimeMs() {
    const currentTimeLog = this.timeLogs[0];
    const elapsedMs = currentTimeLog?.getElapsedMs(this.nowDate) || 0;

    const todayTotalMs = this.getTodayTotalMs();
    const totalWorkMs = this.getTotalWorkTimeMs();
    const workTimeMs = totalWorkMs - (todayTotalMs + elapsedMs);

    return workTimeMs;
  }

  private getTodayTotalMs() {
    const durations = this.timeLogs
      .filter(this.isToday)
      .map((timeLog) => timeLog.getDurationMs());

    return this.sum(durations);
  }

  private sum(nums: number[]): number {
    return nums.reduce((sum, val) => sum + val, 0);
  }

  private isNotToday(timeLog: TimeLog): boolean {
    return !this.isToday(timeLog);
  }

  private isToday(timeLog: TimeLog): boolean {
    return isSameDay(timeLog.startTime, this.nowDate);
  }

  private isThisWeek(timeLog: TimeLog): boolean {
    return isSameWeek(timeLog.startTime, this.nowDate, {
      weekStartsOn: MONDAY,
    });
  }
}
