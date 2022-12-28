import { addDays, parseISO } from "date-fns";
import Workday from "./Workday";
import TimeLogTestFactory from "./TimeLogTestFactory";

// test week: Mon, 2022-08-01 .. Sun, 2022-08-07
const DAY = parseISO("2022-08-01");

describe("Workday", () => {
  describe("fromTimelogs", () => {
    it("returns workdays grouped by day", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(DAY, "09:00:00", 1);
      const timeLog2 = TimeLogTestFactory.testFulfilledTimeLog(DAY, "13:00:00", 1);
      const timeLogNextDay = TimeLogTestFactory.testFulfilledTimeLog(addDays(DAY, 1), "09:00:00", 1);

      const workdays = Workday.fromTimeLogs([
        timeLog,
        timeLog2,
        timeLogNextDay
      ])

      expect(workdays.length).toBe(2);
    });
  });

  describe("getWeekday", () => {
    it("returns weekday as string", () => {
      const timeLogStatistics = new Workday([TimeLogTestFactory.testFulfilledTimeLog(DAY, "09:00:00", 1)]);

      expect(timeLogStatistics.getWeekday()).toBe("Monday");
    });
  });

  describe("getStartTime", () => {
    it("returns start time if one timelog", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(DAY, "09:00:00", 1);

      const timeLogStatistics = new Workday([timeLog]);

      expect(timeLogStatistics.getStartTime()).toEqual(timeLog.startTime);
    });

    it("returns min start time if multiple timelogs", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(DAY, "09:00:00", 1);
      const timeLog2 = TimeLogTestFactory.testFulfilledTimeLog(DAY, "13:00:00", 1);

      const timeLogStatistics = new Workday([timeLog, timeLog2]);

      expect(timeLogStatistics.getStartTime()).toEqual(timeLog.startTime);
    });
  });

  describe("getFormattedStartTime", () => {
    it("returns min start time if multiple timelogs", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(DAY, "09:00:00", 1);
      const timeLog2 = TimeLogTestFactory.testFulfilledTimeLog(DAY, "13:00:00", 1);

      const timeLogStatistics = new Workday([timeLog, timeLog2]);

      expect(timeLogStatistics.getFormattedStartTime()).toEqual("09:00:00");
    });
  });

  describe("validation", () => {
    it("throws error if any timelog is running", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(DAY, "09:00:00", 1);
      const timeLog2 = TimeLogTestFactory.testRunningTimeLog(DAY);

      expect(() => {
        new Workday([timeLog, timeLog2]);
      }).toThrow();
    });

    it("throws error if timelog are at multiple days", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(DAY, "09:00:00", 1);
      const timeLog2 = TimeLogTestFactory.testFulfilledTimeLog(addDays(DAY, 1), "09:00:00", 1);

      expect(() => {
        new Workday([timeLog, timeLog2]);
      }).toThrow();
    });

    it("throws error if timelogs are empty", () => {
      expect(() => {
        new Workday([]);
      }).toThrow();
    });
  });
});
