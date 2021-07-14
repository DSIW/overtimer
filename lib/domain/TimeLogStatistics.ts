import TimeLog from './TimeLog'
import { isToday, format } from 'date-fns'

export default class TimeLogStatistics {
  private readonly timeLogs: TimeLog[]

  constructor(timeLogs: TimeLog[]) {
    this.timeLogs = timeLogs
  }

  getTotalOvertimeMs() {
    const durations = this.timeLogs.map(timeLog => timeLog.getOverworkDurationMs())
    const totalDuration = this.sum(durations)
    const days = new Set(this.timeLogs.map(timeLog => format(timeLog.startTime, 'yyyy-MM-dd'))).length
    return totalDuration - days * this.getTotalWorkTimeMs()
  }

  getTotalWorkTimeMs() {
    return TimeLog.getTotalWorkMs()
  }

  getTimerValues() {
    const currentTimeLog = this.timeLogs[0]

    const totalWorkTimeMs = this.getTotalWorkTimeMs()
    const workTimeMs = this.getCurrentWorkTimeMs()

    const isOverdue = workTimeMs <= 0

    const value = Math.abs(workTimeMs)

    const isRunning = currentTimeLog?.isRunning() || false

    const percentage = isOverdue ? 100 : value / totalWorkTimeMs * 100

    return {
      isRunning,
      value,
      percentage,
      isOverdue
    }
  }

  private getCurrentWorkTimeMs() {
    const currentTimeLog = this.timeLogs[0]
    const elapsedMs = currentTimeLog?.getElapsedMs() || 0

    const todayTotalMs = this.getTodayTotalMs()
    const totalWorkMs = this.getTotalWorkTimeMs()
    const workTimeMs = totalWorkMs - (todayTotalMs + elapsedMs)

    return workTimeMs
  }

  private getTodayTotalMs() {
    const durations = this.timeLogs
      .filter((timeLog) => isToday(timeLog.startTime))
      .map(timeLog => timeLog.getDurationMs())

    return this.sum(durations)
  }

  private sum(nums: number[]): number {
    return nums.reduce((sum, val) => sum + val, 0)
  }
}
