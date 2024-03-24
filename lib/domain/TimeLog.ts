import * as DateFns from "date-fns";

interface Fields {
  id?: number;
  startTime: Date;
  endTime?: Date;
}

export default class TimeLog {
  public readonly id: number | undefined;
  public readonly startTime: Date;
  public readonly endTime?: Date;

  constructor(fields: Fields) {
    this.id = fields.id;
    this.startTime = this.reducePrecision(fields.startTime);
    this.endTime = fields.endTime && this.reducePrecision(fields.endTime);
  }

  static startedNow() {
    return new TimeLog({ startTime: new Date() });
  }

  clone() {
    return new TimeLog({
      id: this.id,
      startTime: this.startTime,
      endTime: this.endTime,
    });
  }

  isValid() {
    const end = this.endTime || new Date();
    const sameDay = DateFns.isSameDay(this.startTime, end);
    return sameDay && this.startTime < end;
  }

  isRunning() {
    return !this.endTime;
  }

  isDone() {
    return !this.isRunning();
  }

  isDeletable() {
    return !(this.isRunning() && DateFns.isToday(this.startTime));
  }

  getElapsedMs(nowDate: Date): number {
    if (this.isDone()) {
      return 0;
    }

    const now = this.reducePrecision(nowDate);
    return +now - +this.startTime;
  }

  getDurationMs(): number {
    if (this.endTime === undefined) {
      return 0;
    }

    return +this.endTime - +this.startTime;
  }

  private reducePrecision(time: Date): Date {
    return DateFns.setMilliseconds(time, 0);
  }
}
