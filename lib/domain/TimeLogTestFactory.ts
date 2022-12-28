import { withTime } from "./time-constants";
import TimeLog from "./TimeLog";
import { addHours } from "date-fns";

export default class TimeLogTestFactory {
  static testFulfilledTimeLog(date: Date, formattedStartTime: string, hours: number) {
    const startTime = withTime(date, formattedStartTime);
    return new TimeLog({
      startTime: startTime,
      endTime: addHours(startTime, hours),
    });
  }

  static testRunningTimeLog(date: Date) {
    return new TimeLog({ startTime: date });
  }
}
