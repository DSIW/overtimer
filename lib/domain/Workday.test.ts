import { addDays, parseISO } from "date-fns";
import Workday from "./Workday";
import TimeLogTestFactory from "./TimeLogTestFactory";
import { HOUR } from "./time-constants";

// test week: Mon, 2022-08-01 .. Sun, 2022-08-07
const DAY = parseISO("2022-08-01");

describe("Workday", () => {
  describe("fromTimelogs", () => {
    it("returns workdays grouped by day", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "09:00:00",
        1
      );
      const timeLog2 = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "13:00:00",
        1
      );
      const timeLogNextDay = TimeLogTestFactory.testFulfilledTimeLog(
        addDays(DAY, 1),
        "09:00:00",
        1
      );

      const workdays = Workday.fromTimeLogs([
        timeLog,
        timeLog2,
        timeLogNextDay,
      ]);

      expect(workdays.length).toBe(2);
    });
  });

  describe("getWeekday", () => {
    it("returns weekday as string", () => {
      const workday = new Workday([
        TimeLogTestFactory.testFulfilledTimeLog(DAY, "09:00:00", 1),
      ]);

      expect(workday.getWeekday()).toBe("Monday");
    });
  });

  describe("format", () => {
    it("returns formatted date", () => {
      const workday = new Workday([
        TimeLogTestFactory.testFulfilledTimeLog(DAY, "09:00:00", 1),
      ]);

      expect(workday.format("yyyy")).toBe("2022");
    });
  });

  describe("getStartTime", () => {
    it("returns start time if one timelog", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "09:00:00",
        1
      );

      const workday = new Workday([timeLog]);

      expect(workday.getStartTime()).toEqual(timeLog.startTime);
    });

    it("returns min start time if multiple timelogs", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "09:00:00",
        1
      );
      const timeLog2 = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "13:00:00",
        1
      );

      const workday = new Workday([timeLog, timeLog2]);

      expect(workday.getStartTime()).toEqual(timeLog.startTime);
    });
  });

  describe("getEndTime", () => {
    it("returns end time if one timelog", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "09:00:00",
        1
      );

      const workday = new Workday([timeLog]);

      expect(workday.getEndTime()).toEqual(timeLog.endTime);
    });

    it("returns max end time if multiple timelogs", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "09:00:00",
        1
      );
      const timeLog2 = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "13:00:00",
        1
      );

      const workday = new Workday([timeLog, timeLog2]);

      expect(workday.getEndTime()).toEqual(timeLog2.endTime);
    });
  });

  describe("getTotalWorkTimeMs", () => {
    it("returns total work time if one timelog", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "09:00:00",
        1
      );
      const timeLog2 = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "13:00:00",
        1
      );

      const workday = new Workday([timeLog, timeLog2]);

      expect(workday.getTotalWorkTimeMs()).toEqual(2 * HOUR);
    });
  });

  describe("getCappedTotalWorkTimeMs", () => {
    it("returns work limit if limit is exceeded", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "09:00:00",
        9
      );

      const workday = new Workday([timeLog]);

      expect(workday.getCappedTotalWorkTimeMs()).toEqual(8 * HOUR);
    });

    it("returns work time if not exceeding limit", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "09:00:00",
        8
      );

      const workday = new Workday([timeLog]);

      expect(workday.getCappedTotalWorkTimeMs()).toEqual(8 * HOUR);
    });
  });

  describe("getOvertimeMs", () => {
    it("returns 0 overtime time if less than 8 hours of work", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "09:00:00",
        1
      );

      const workday = new Workday([timeLog]);

      expect(workday.getOvertimeMs()).toEqual(0 * HOUR);
    });

    it("returns total overtime time if more than 8 hours of work", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "09:00:00",
        8
      );
      const timeLog2 = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "13:00:00",
        1
      );

      const workday = new Workday([timeLog, timeLog2]);

      expect(workday.getOvertimeMs()).toEqual(1 * HOUR);
    });
  });

  describe("getOverAndUndertimeMs", () => {
    it("returns overtime time if more than 8 hours of work", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "09:00:00",
        9
      );

      const workday = new Workday([timeLog]);

      expect(workday.getOverAndUndertimeMs()).toEqual(1 * HOUR);
    });

    it("returns negative overtime if less than 8 hours of work", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "09:00:00",
        7
      );

      const workday = new Workday([timeLog]);

      expect(workday.getOverAndUndertimeMs()).toEqual(-1 * HOUR);
    });
  });

  describe("getPauseMs", () => {
    it("returns 0 if one timelog", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "09:00:00",
        1
      );

      const workday = new Workday([timeLog]);

      expect(workday.getPauseMs()).toEqual(0);
    });

    it("returns time between time logs", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "09:00:00",
        1
      );

      const timeLogAfterBreak = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "11:00:00",
        1
      );

      const timeLogAfterSecBreak = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "13:00:00",
        1
      );

      const workday = new Workday([
        timeLog,
        timeLogAfterBreak,
        timeLogAfterSecBreak,
      ]);

      expect(workday.getPauseMs()).toEqual(2 * HOUR);
    });
  });

  describe("validation", () => {
    it("throws error if any timelog is running", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "09:00:00",
        1
      );
      const timeLog2 = TimeLogTestFactory.testRunningTimeLog(DAY);

      expect(() => {
        new Workday([timeLog, timeLog2]);
      }).toThrow();
    });

    it("throws error if timelog are at multiple days", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "09:00:00",
        1
      );
      const timeLog2 = TimeLogTestFactory.testFulfilledTimeLog(
        addDays(DAY, 1),
        "09:00:00",
        1
      );

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
