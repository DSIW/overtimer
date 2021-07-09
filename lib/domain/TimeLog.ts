import { isToday } from 'date-fns'

const WORK_HOURS = 8
const HOURS_TO_MILLISECONDS = 60*60*1000
const WORK_HOURS_MS = WORK_HOURS * HOURS_TO_MILLISECONDS
const DURATION_ZERO = 0

interface Fields {
  startTime: Date;
  endTime?: Date
}

export default class TimeLog {
  public startTime: Date
  public endTime?: Date

  constructor(fields: Fields) {
    this.startTime = fields.startTime
    this.endTime = fields.endTime
  }

  static getTotalWorkMs() {
    return WORK_HOURS_MS;
  }

  isRunning() {
    return !this.endTime
  }

  isDone() {
    return !this.isRunning()
  }

  getElapsedMs(): number {
    const end = this.endTime || new Date()
    return +end - +this.startTime
  }

  getWorkTimeMs(): number {
    return TimeLog.getTotalWorkMs() - this.getElapsedMs()
  }

  getDurationMs(): number {
    if (this.endTime === undefined) {
      return DURATION_ZERO
    }

    return +this.endTime - +this.startTime
  }

  getOverworkDurationMs(): number {
    const duration = this.getDurationMs() - WORK_HOURS_MS

    if (!this.endTime || isToday(this.endTime) && duration < 0)  {
      return DURATION_ZERO;
    }

    return duration
  }
}
