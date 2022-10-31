import TimeLog from "./TimeLog";
import TimeLogStatistics from "./TimeLogStatistics";
import { addHours, previousMonday, previousSunday, subDays } from "date-fns";
import { HOUR, withTime } from "./time-constants";

const TODAY = new Date();
export const YESTERDAY = subDays(todayWorkdayStart(), 1);

describe("TimeLogStatistics", () => {
  describe("getDays()", () => {
    it("returns 0 if no time logs", () => {
      const timeLogStatistics = new TimeLogStatistics([]);

      expect(timeLogStatistics.getDays()).toBe(0);
    });

    it("returns 1 if one running time log", () => {
      const currentTimeLog = testRunningTimeLog(todayWorkdayStart());

      const timeLogStatistics = new TimeLogStatistics([currentTimeLog]);

      expect(timeLogStatistics.getDays()).toBe(1);
    });

    it("returns 1 if two time logs at the same day", () => {
      const currentTimeLog = testRunningTimeLog(todayWorkdayStart());

      const timeLogStatistics = new TimeLogStatistics([
        currentTimeLog,
        currentTimeLog,
      ]);

      expect(timeLogStatistics.getDays()).toBe(1);
    });

    it("returns 2 if two time logs at different days", () => {
      const currentTimeLog = testRunningTimeLog(todayWorkdayStart());

      const yesterdayTimeLog = testRunningTimeLog(YESTERDAY);

      const timeLogStatistics = new TimeLogStatistics([
        currentTimeLog,
        yesterdayTimeLog,
      ]);

      expect(timeLogStatistics.getDays()).toBe(2);
    });
  });

  describe("getTotalOvertimeMs()", () => {
    it("returns 0 if no time logs", () => {
      const overtimeMs = new TimeLogStatistics([]).getTotalOvertimeMs();

      expect(overtimeMs).toBe(0);
    });

    it("returns 0 if today's time log is running", () => {
      const currentTimeLog = testRunningTimeLog(todayWorkdayStart());

      const statistics = new TimeLogStatistics([currentTimeLog]);

      expect(statistics.getTotalOvertimeMs()).toBe(0);
    });

    it("returns 0h if todays's time log has duration of 7h", () => {
      const currentTimeLog = testFulfilledTimeLog(todayWorkdayStart(), 8 - 1);

      const statistics = new TimeLogStatistics([currentTimeLog]);

      expect(statistics.getTotalOvertimeMs()).toBe(0);
    });

    it("returns 1h if todays's time log has duration of 9h", () => {
      const currentTimeLog = testFulfilledTimeLog(todayWorkdayStart(), 8 + 1);

      const statistics = new TimeLogStatistics([currentTimeLog]);

      expect(statistics.getTotalOvertimeMs()).toBe(1 * HOUR);
    });

    it("returns 1h if yesterday's time log has duration of 9h", () => {
      const currentTimeLog = testFulfilledTimeLog(YESTERDAY, 8 + 1);

      const statistics = new TimeLogStatistics([currentTimeLog]);

      expect(statistics.getTotalOvertimeMs()).toBe(1 * HOUR);
    });

    it("returns -1h if yesterday's time log has duration of 7h", () => {
      const currentTimeLog = testFulfilledTimeLog(YESTERDAY, 8 - 1);

      const statistics = new TimeLogStatistics([currentTimeLog]);

      expect(statistics.getTotalOvertimeMs()).toBe(-1 * HOUR);
    });

    it("returns 2h if yesterday's and todays's time log has duration of 9h", () => {
      const yesterdayTimeLog = testFulfilledTimeLog(YESTERDAY, 8 + 1);
      const currentTimeLog = testFulfilledTimeLog(todayWorkdayStart(), 8 + 1);

      const statistics = new TimeLogStatistics([
        currentTimeLog,
        yesterdayTimeLog,
      ]);

      expect(statistics.getTotalOvertimeMs()).toBe(2 * HOUR);
    });

    it("returns 0h if yesterday's time logs have total duration of 8h", () => {
      const yesterdayTimeLog = testFulfilledTimeLog(YESTERDAY, 4);
      const yesterdayTimeLog2 = testFulfilledTimeLog(YESTERDAY, 4);

      const statistics = new TimeLogStatistics([
        yesterdayTimeLog,
        yesterdayTimeLog2,
      ]);

      expect(statistics.getTotalOvertimeMs()).toBe(0);
    });
  });

  describe("getWeeklyOvertimeMs()", () => {
    it("returns 1h if this week's time log has duration of 9h", () => {
      const currentTimeLog = testFulfilledTimeLog(todayWorkdayStart(), 8 + 1);

      const statistics = new TimeLogStatistics([currentTimeLog]);

      expect(statistics.getWeeklyOvertimeMs()).toBe(1 * HOUR);
    });

    it("returns 0h if previous monday's time log has duration of 9h", () => {
      const lastWeekTimeLog = testFulfilledTimeLog(previousMonday(TODAY), 8 + 1);

      const statistics = new TimeLogStatistics([lastWeekTimeLog]);

      expect(statistics.getWeeklyOvertimeMs()).toBe(0);
    });

    it("returns 0h if previous sunday's time log has duration of 9h", () => {
      const lastWeekTimeLog = testFulfilledTimeLog(previousSunday(TODAY), 8 + 1);

      const statistics = new TimeLogStatistics([lastWeekTimeLog]);

      expect(statistics.getWeeklyOvertimeMs()).toBe(0);
    });
  });
});

export function todayWorkdayStart() {
  return withTime(new Date(), "09:00:00");
}

function testFulfilledTimeLog(date: Date, hours: number) {
  return new TimeLog({
    startTime: date,
    endTime: addHours(date, hours),
  });
}

function testRunningTimeLog(date: Date) {
  return new TimeLog({ startTime: date });
}
