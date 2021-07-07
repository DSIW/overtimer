import { intervalToDuration, subHours } from 'date-fns'

const WORK_HOURS = 8

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

  isRunning() {
    return this.endTime === null
  }

  isDone() {
    return !this.isRunning()
  }

  getDuration(): number {
    if (this.isRunning()) {
      return DURATION_ZERO
    }

    return this.endTime - this.startTime
  }

  getOverworkDuration(): number {
    if (this.isRunning()) {
      return DURATION_ZERO
    }

    return subHours(this.endTime, WORK_HOURS) - this.startTime
  }
}
