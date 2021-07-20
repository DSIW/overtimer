import {isSameDay, isToday, setMilliseconds} from 'date-fns'

interface Fields {
  startTime: Date;
  endTime?: Date
}

export default class TimeLog {
  public readonly startTime: Date
  public readonly endTime?: Date

  constructor(fields: Fields) {
    this.startTime = this.reducePrecision(fields.startTime)
    this.endTime = fields.endTime && this.reducePrecision(fields.endTime)
  }

  static startedNow() {
      return new TimeLog({ startTime: new Date() })
  }

  clone() {
    return new TimeLog({
      startTime: this.startTime,
      endTime: this.endTime
    })
  }

  isValid() {
    const end = this.endTime || new Date()
    const sameDay = isSameDay(this.startTime, end)
    return sameDay && this.startTime < end
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

  private reducePrecision(time: Date): Date {
    return setMilliseconds(time, 0);
  }
}
