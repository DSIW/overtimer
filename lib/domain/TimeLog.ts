import { subHours } from 'date-fns'

const WORK_HOURS = 8
const HOURS_TO_MILLISECONDS = 60*60*1000
const DURATION_ZERO = 0

interface Fields {
  startTime: Date;
  endTime: Date | null;
}

export default class TimeLog {
  public startTime: Date
  public endTime: Date | null

  constructor(fields: Fields) {
    this.startTime = fields.startTime
    this.endTime = fields.endTime
  }

  static getTotalWorkMs() {
    return WORK_HOURS*HOURS_TO_MILLISECONDS;
  }

  isRunning() {
    return this.endTime === null
  }

  isDone() {
    return !this.isRunning()
  }

  getElapsedMs(): number {
    if (this.endTime === null) {
      return +new Date() - +this.startTime
    }

    return +this.endTime - +this.startTime
  }

  getWorkTimeMs(): number {
    return TimeLog.getTotalWorkMs() - this.getElapsedMs()
  }

  getDurationMs(): number {
    if (this.endTime === null) {
      return DURATION_ZERO
    }

    return +this.endTime - +this.startTime
  }

  getOverworkDurationMs(): number {
    if (this.endTime === null) {
      return DURATION_ZERO
    }

    return +subHours(this.endTime, WORK_HOURS) - +this.startTime
  }
}
