import TimeLog from './TimeLog'
import { isToday } from 'date-fns'

export default class TimerLogStatistics {
  private readonly timeLogs: TimeLog[]

  constructor(timeLogs: TimeLog[]) {
    this.timeLogs = timeLogs
  }

  getTodayTotalMs() {
    const durations = this.timeLogs
      .filter((timeLog) => isToday(timeLog.startTime))
      .map(timeLog => timeLog.getDurationMs())

    return this.sum(durations)
  }

  getTotalOvertimeMs() {
    const durations = this.timeLogs.map(timeLog => timeLog.getOverworkDurationMs())
    return this.sum(durations)
  }

  private sum(nums: number[]): number {
    return nums.reduce((sum, val) => sum + val, 0)
  }
}
