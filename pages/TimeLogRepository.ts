import TimeLog from "./TimeLog"

export default class TimeLogRepository {
  private timeLogs: TimeLog[]

  constructor() {
    this.timeLogs = []
  }

  all() {
    return this.timeLogs
  }

  save(timeLog: TimeLog) {
    this.timeLogs = [timeLog, ...this.timeLogs]
  }

  updateLast(timeLog: TimeLogs) {
    const [_, ...previousTimeLogs] = this.timeLogs
    this.timeLogs = [timeLog, ...previousTimeLogs]
  }
}

export const timeLogRepository = new TimeLogRepository()
