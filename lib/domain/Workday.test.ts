import TimeLog from "./TimeLog";
import { addHours, parseISO } from "date-fns";
import { withTime } from "./time-constants";
import Workday from "./Workday";

// test week: Mon, 2022-08-01 .. Sun, 2022-08-07
const DAY = parseISO("2022-08-01");

describe("Workday", () => {
  describe("getWeekday", () => {
    it("returns weekday as string", () => {
      const timeLogStatistics = new Workday([testFulfilledTimeLog(DAY, "09:00:00", 1)]);

      expect(timeLogStatistics.getWeekday()).toBe("Monday");
    });
  });

  describe("getStartTime", () => {
    it("returns start time if one timelog", () => {
      const timeLog = testFulfilledTimeLog(DAY, "09:00:00", 1);

      const timeLogStatistics = new Workday([timeLog]);

      expect(timeLogStatistics.getStartTime()).toEqual(timeLog.startTime);
    });

    it("returns min start time if multiple timelogs", () => {
      const timeLog = testFulfilledTimeLog(DAY, "09:00:00", 1);
      const timeLog2 = testFulfilledTimeLog(DAY, "13:00:00", 1);

      const timeLogStatistics = new Workday([timeLog, timeLog2]);

      expect(timeLogStatistics.getStartTime()).toEqual(timeLog.startTime);
    });
  });

  describe("getFormattedStartTime", () => {
    it("returns min start time if multiple timelogs", () => {
      const timeLog = testFulfilledTimeLog(DAY, "09:00:00", 1);
      const timeLog2 = testFulfilledTimeLog(DAY, "13:00:00", 1);

      const timeLogStatistics = new Workday([timeLog, timeLog2]);

      expect(timeLogStatistics.getFormattedStartTime()).toEqual("09:00:00");
    });
  });
});

function testFulfilledTimeLog(date: Date, formattedStartTime: string, hours: number) {
  const startTime = withTime(date, formattedStartTime);
  return new TimeLog({
    startTime: startTime,
    endTime: addHours(startTime, hours),
  });
}