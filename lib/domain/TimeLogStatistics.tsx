import TimeLog from './TimeLog'
import { isToday } from 'date-fns'

export default class TimerLogStatistics {
  private readonly timeLogs: TimeLog[]

  constructor(timeLogs: TimeLog[]) {
    this.timeLogs = timeLogs
  }

  getTotalOvertimeMs() {
    const durations = this.timeLogs.map(timeLog => timeLog.getOverworkDurationMs())
    return this.sum(durations)
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

    const maxValue = isOverdue ? value : totalWorkTimeMs
    const isRunning = currentTimeLog?.isRunning() || false

    return {
      isRunning,
      value,
      maxValue,
      isOverdue
    }
  }

  private getCurrentWorkTimeMs() {
    const currentTimeLog = this.timeLogs[0]
    const elapsedMs = currentTimeLog?.getElapsedMs() || 0

    const todayTotalMs = this.getTodayTotalMs()
    const totalWorkMs = this.getTotalWorkTimeMs()
    const workTimeMs = totalWorkMs - (todayTotalMs + elapsedMs)

    console.log({
      totalWorkMs, todayTotalMs, elapsedMs
    })

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
