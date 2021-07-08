import { subHours } from 'date-fns'

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
    if (this.endTime === null) {
      return DURATION_ZERO
    }

    // @ts-ignore
    return this.endTime - this.startTime
  }

  getOverworkDuration(): number {
    if (this.endTime === null) {
      return DURATION_ZERO
    }

    // @ts-ignore
    return subHours(this.endTime, WORK_HOURS) - this.startTime
  }
}
