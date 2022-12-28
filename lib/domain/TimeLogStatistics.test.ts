import TimeLog from "./TimeLog";
import TimeLogStatistics from "./TimeLogStatistics";
import { addHours, parseISO, subDays, subHours, subWeeks } from "date-fns";
import { HOUR, withTime } from "./time-constants";
import TimeLogTestFactory from "./TimeLogTestFactory";

// test week: Mon, 2022-08-01 .. Sun, 2022-08-07
const TODAY = parseISO("2022-08-01");
const YESTERDAY = subDays(todayWorkdayStart(), 1);

describe("TimeLogStatistics", () => {
  describe("getDays()", () => {
    it("returns 0 if no time logs", () => {
      const timeLogStatistics = new TimeLogStatistics([], TODAY);

      expect(timeLogStatistics.getDays()).toBe(0);
    });

    it("returns 1 if one running time log", () => {
      const currentTimeLog = TimeLogTestFactory.testRunningTimeLog(todayWorkdayStart());

      const timeLogStatistics = new TimeLogStatistics([currentTimeLog], TODAY);

      expect(timeLogStatistics.getDays()).toBe(1);
    });

    it("returns 1 if two time logs at the same day", () => {
      const currentTimeLog = TimeLogTestFactory.testRunningTimeLog(todayWorkdayStart());

      const timeLogStatistics = new TimeLogStatistics(
        [currentTimeLog, currentTimeLog],
        TODAY
      );

      expect(timeLogStatistics.getDays()).toBe(1);
    });

    it("returns 2 if two time logs at different days", () => {
      const currentTimeLog = TimeLogTestFactory.testRunningTimeLog(todayWorkdayStart());

      const yesterdayTimeLog = TimeLogTestFactory.testRunningTimeLog(YESTERDAY);

      const timeLogStatistics = new TimeLogStatistics(
        [currentTimeLog, yesterdayTimeLog],
        TODAY
      );

      expect(timeLogStatistics.getDays()).toBe(2);
    });
  });

  describe("getTotalOvertimeMs()", () => {
    it("returns 0 if no time logs", () => {
      const overtimeMs = new TimeLogStatistics([], TODAY).getTotalOvertimeMs();

      expect(overtimeMs).toBe(0);
    });

    it("returns 0 if time log is running", () => {
      const currentTimeLog = TimeLogTestFactory.testRunningTimeLog(todayWorkdayStart());

      const statistics = new TimeLogStatistics([currentTimeLog], TODAY);

      expect(statistics.getTotalOvertimeMs()).toBe(0);
    });

    it("returns 0h if today's time log has duration of 7h", () => {
      const currentTimeLog = testFulfilledTimeLog(todayWorkdayStart(), 8 - 1);

      const statistics = new TimeLogStatistics([currentTimeLog], TODAY);

      expect(statistics.getTotalOvertimeMs()).toBe(0);
    });

    it("returns 1h if today's time log has duration of 9h", () => {
      const currentTimeLog = testFulfilledTimeLog(todayWorkdayStart(), 8 + 1);

      const statistics = new TimeLogStatistics([currentTimeLog], TODAY);

      expect(statistics.getTotalOvertimeMs()).toBe(1 * HOUR);
    });

    it("returns 1h if yesterday's time log has duration of 9h", () => {
      const currentTimeLog = testFulfilledTimeLog(YESTERDAY, 8 + 1);

      const statistics = new TimeLogStatistics([currentTimeLog], TODAY);

      expect(statistics.getTotalOvertimeMs()).toBe(1 * HOUR);
    });

    it("returns -1h if yesterday's time log has duration of 7h", () => {
      const currentTimeLog = testFulfilledTimeLog(YESTERDAY, 8 - 1);

      const statistics = new TimeLogStatistics([currentTimeLog], TODAY);

      expect(statistics.getTotalOvertimeMs()).toBe(-1 * HOUR);
    });

    it("returns 2h if yesterday's and today's time log has duration of 9h", () => {
      const yesterdayTimeLog = testFulfilledTimeLog(YESTERDAY, 8 + 1);
      const currentTimeLog = testFulfilledTimeLog(todayWorkdayStart(), 8 + 1);

      const statistics = new TimeLogStatistics(
        [currentTimeLog, yesterdayTimeLog],
        TODAY
      );

      expect(statistics.getTotalOvertimeMs()).toBe(2 * HOUR);
    });

    it("returns 0h if yesterday's time logs have total duration of 8h", () => {
      const yesterdayTimeLog = testFulfilledTimeLog(YESTERDAY, 4);
      const yesterdayTimeLog2 = testFulfilledTimeLog(YESTERDAY, 4);

      const statistics = new TimeLogStatistics(
        [yesterdayTimeLog, yesterdayTimeLog2],
        TODAY
      );

      expect(statistics.getTotalOvertimeMs()).toBe(0);
    });
  });

  describe("getWeeklyOvertimeMs()", () => {
    it("returns 1h if this week's time log has duration of 9h", () => {
      const currentTimeLog = testFulfilledTimeLog(todayWorkdayStart(), 8 + 1);

      const statistics = new TimeLogStatistics([currentTimeLog], TODAY);

      expect(statistics.getWeeklyOvertimeMs()).toBe(1 * HOUR);
    });

    it("returns 0h if previous week's time log has duration of 9h", () => {
      const lastWeekTimeLog = testFulfilledTimeLog(subWeeks(TODAY, 1), 8 + 1);

      const statistics = new TimeLogStatistics([lastWeekTimeLog], TODAY);

      expect(statistics.getWeeklyOvertimeMs()).toBe(0);
    });

    it("returns 0h if previous week's time log has overtime but is Sunday", () => {
      const lastWeekTimeLog = testFulfilledTimeLog(YESTERDAY, 8 + 1);

      const statistics = new TimeLogStatistics([lastWeekTimeLog], TODAY);

      expect(statistics.getWeeklyOvertimeMs()).toBe(0);
    });
  });

  describe("getTimerStatistics()", () => {
    it("returns remaining 8h when timer has not been started", () => {
      const statistics = new TimeLogStatistics([], TODAY);

      expect(statistics.getTimerValues()).toEqual({
        isRunning: false,
        value: 8 * HOUR,
        percentage: 100,
        isOverdue: false,
      });
    });

    it("returns remaining 4h if timer runs for 4 hours", () => {
      const today = withTime(new Date(), "17:00:00");
      const timeLog = TimeLogTestFactory.testRunningTimeLog(subHours(today, 4));
      const statistics = new TimeLogStatistics([timeLog], today);

      expect(statistics.getTimerValues()).toEqual({
        isRunning: true,
        value: 4 * HOUR,
        percentage: 50,
        isOverdue: false,
      });
    });

    it("returns overtime of 1h if timer runs for 9 hours", () => {
      const today = withTime(new Date(), "17:00:00");
      const timeLog = TimeLogTestFactory.testRunningTimeLog(subHours(today, 9));
      const statistics = new TimeLogStatistics([timeLog], today);

      expect(statistics.getTimerValues()).toEqual({
        isRunning: true,
        value: 1 * HOUR,
        percentage: 100,
        isOverdue: true,
      });
    });
  });
});

function todayWorkdayStart() {
  return withTime(TODAY, "09:00:00");
}

function testFulfilledTimeLog(date: Date, hours: number) {
  return new TimeLog({
    startTime: date,
    endTime: addHours(date, hours),
  });
}

