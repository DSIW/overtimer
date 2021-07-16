import { isToday } from 'date-fns'

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

  isValid() {
    const end = this.endTime || new Date()
    return this.startTime < end
  }

  isRunning() {
    return !this.endTime
  }

  isDone() {
    return !this.isRunning()
  }

  isDeletable() {
    return !(this.isRunning() && isToday(this.startTime))
  }

  getElapsedMs(): number {
    if (this.isDone()) {
      return 0;
    }

    const end = this.endTime || new Date()
    return +end - +this.startTime
  }

  getDurationMs(): number {
    if (this.endTime === undefined) {
      return 0
    }

    return +this.endTime - +this.startTime
  }
}
