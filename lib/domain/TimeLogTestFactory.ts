import { withTime } from "./time-constants";
import TimeLog from "./TimeLog";
import * as DateFns from "date-fns";

export default class TimeLogTestFactory {
  static testFulfilledTimeLog(
    date: Date,
    formattedStartTime: string,
    hours: number
  ) {
    const startTime = withTime(date, formattedStartTime);
    return new TimeLog({
      startTime: startTime,
      endTime: DateFns.addHours(startTime, hours),
    });
  }

  static testRunningTimeLog(date: Date) {
    return new TimeLog({ startTime: date });
  }
}
