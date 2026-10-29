import { vi } from "vitest";
import TimeLog from "./TimeLog";
import TimeLogStatistics from "./TimeLogStatistics";
import * as DateFns from "date-fns";
import { HOUR, withTime } from "./time-constants";
import TimeLogTestFactory from "./TimeLogTestFactory";

// test week: Mon, 2022-08-01 .. Sun, 2022-08-07
const TODAY = DateFns.parseISO("2022-08-01");
const YESTERDAY = DateFns.subDays(todayWorkdayStart(), 1);

describe("TimeLogStatistics", () => {
  describe("getDays()", () => {
    it("returns 0 if no time logs", () => {
      const timeLogStatistics = new TimeLogStatistics([], TODAY);

      expect(timeLogStatistics.getDays()).toBe(0);
    });

    it("returns 1 if one running time log", () => {
      const currentTimeLog =
        TimeLogTestFactory.testRunningTimeLog(todayWorkdayStart());

      const timeLogStatistics = new TimeLogStatistics([currentTimeLog], TODAY);

      expect(timeLogStatistics.getDays()).toBe(1);
    });

    it("returns 1 if two time logs at the same day", () => {
      const currentTimeLog =
        TimeLogTestFactory.testRunningTimeLog(todayWorkdayStart());

      const timeLogStatistics = new TimeLogStatistics(
        [currentTimeLog, currentTimeLog],
        TODAY
      );

      expect(timeLogStatistics.getDays()).toBe(1);
    });

    it("returns 2 if two time logs at different days", () => {
      const currentTimeLog =
        TimeLogTestFactory.testRunningTimeLog(todayWorkdayStart());

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
      const currentTimeLog =
        TimeLogTestFactory.testRunningTimeLog(todayWorkdayStart());

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
      const lastWeekTimeLog = testFulfilledTimeLog(
        DateFns.subWeeks(TODAY, 1),
        8 + 1
      );

      const statistics = new TimeLogStatistics([lastWeekTimeLog], TODAY);

      expect(statistics.getWeeklyOvertimeMs()).toBe(0);
    });

    it("returns 0h if previous week's time log has overtime but is Sunday", () => {
      const lastWeekTimeLog = testFulfilledTimeLog(YESTERDAY, 8 + 1);

      const statistics = new TimeLogStatistics([lastWeekTimeLog], TODAY);

      expect(statistics.getWeeklyOvertimeMs()).toBe(0);
    });
  });

  describe("getTotalOvertimeMs() across several days", () => {
    it("ignores a running time log left over from a previous day", () => {
      const forgotten = TimeLogTestFactory.testRunningTimeLog(YESTERDAY);

      const statistics = new TimeLogStatistics([forgotten], TODAY);

      expect(statistics.getTotalOvertimeMs()).toBe(0);
    });

    it("counts each past day fully against its own target", () => {
      // two days ago 10h (+2h), yesterday 5h (-3h)
      const twoDaysAgo = testFulfilledTimeLog(
        DateFns.subDays(YESTERDAY, 1),
        10
      );
      const yesterday = testFulfilledTimeLog(YESTERDAY, 5);

      const statistics = new TimeLogStatistics([yesterday, twoDaysAgo], TODAY);

      expect(statistics.getTotalOvertimeMs()).toBe(-1 * HOUR);
    });

    it("does not let today's undertime reduce the overtime of past days", () => {
      const yesterday = testFulfilledTimeLog(YESTERDAY, 8 + 2);
      const today = testFulfilledTimeLog(todayWorkdayStart(), 3);

      const statistics = new TimeLogStatistics([today, yesterday], TODAY);

      expect(statistics.getTotalOvertimeMs()).toBe(2 * HOUR);
    });

    it("counts today's overtime once today's done time logs exceed the target", () => {
      const morning = testFulfilledTimeLog(todayWorkdayStart(), 5);
      const afternoon = testFulfilledTimeLog(
        DateFns.addHours(todayWorkdayStart(), 6),
        4
      );

      const statistics = new TimeLogStatistics([afternoon, morning], TODAY);

      expect(statistics.getTotalOvertimeMs()).toBe(1 * HOUR);
    });
  });

  describe("getWeeklyOvertimeMs() within the current week", () => {
    // Wed, 2026-10-28; the week started Mon, 2026-10-26
    const NOW = DateFns.parseISO("2026-10-28T18:00:00");
    const at = (day: string, start: string, hours: number) =>
      TimeLogTestFactory.testFulfilledTimeLog(
        DateFns.parseISO(day),
        start,
        hours
      );

    afterEach(() => {
      vi.useRealTimers();
    });

    it("counts past days of the week fully and today's undertime not at all", () => {
      vi.useFakeTimers({ toFake: ["Date"] });
      vi.setSystemTime(NOW);
      // Mon 7h (-1h), today 3h (ignored), last Fri 10h (other week)
      const timeLogs = [
        at("2026-10-28", "08:00:00", 3),
        at("2026-10-26", "08:00:00", 7),
        at("2026-10-23", "08:00:00", 10),
      ];

      const statistics = new TimeLogStatistics(timeLogs, NOW);

      expect(statistics.getWeeklyOvertimeMs()).toBe(-1 * HOUR);
    });

    it("applies the past/today split relative to the given now", () => {
      // Wed, 2022-08-03 (system time is not faked)
      const now = DateFns.parseISO("2022-08-03T18:00:00");
      // Mon 9h (+1h), today 3h (today's undertime must be ignored)
      const timeLogs = [
        at("2022-08-03", "08:00:00", 3),
        at("2022-08-01", "08:00:00", 9),
      ];

      const statistics = new TimeLogStatistics(timeLogs, now);

      expect(statistics.getWeeklyOvertimeMs()).toBe(1 * HOUR);
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
      const timeLog = TimeLogTestFactory.testRunningTimeLog(
        DateFns.subHours(today, 4)
      );
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
      const timeLog = TimeLogTestFactory.testRunningTimeLog(
        DateFns.subHours(today, 9)
      );
      const statistics = new TimeLogStatistics([timeLog], today);

      expect(statistics.getTimerValues()).toEqual({
        isRunning: true,
        value: 1 * HOUR,
        percentage: 100,
        isOverdue: true,
      });
    });
  });

  describe("getTimerValues() with a running time log from a previous day", () => {
    it("does not count the previous day's elapsed time for today", () => {
      const now = withTime(new Date(), "17:00:00");
      const timeLog = TimeLogTestFactory.testRunningTimeLog(
        DateFns.subDays(DateFns.subHours(now, 4), 1)
      );
      const statistics = new TimeLogStatistics([timeLog], now);

      expect(statistics.getTimerValues()).toMatchObject({
        value: 8 * HOUR,
        isOverdue: false,
      });
    });
  });

  describe("pauseMs in getTimerValues()", () => {
    const at = (time: string) => withTime(TODAY, time);
    const doneLog = (start: string, hours: number) =>
      TimeLogTestFactory.testFulfilledTimeLog(TODAY, start, hours);

    it("returns time since last stop within the pause window", () => {
      const statistics = new TimeLogStatistics(
        [doneLog("08:00:00", 2)],
        at("10:30:00")
      );

      expect(statistics.getTimerValues().pauseMs).toBe(30 * 60 * 1000);
    });

    it("uses the latest stop of today", () => {
      const statistics = new TimeLogStatistics(
        [doneLog("11:00:00", 1), doneLog("08:00:00", 2)],
        at("12:30:00")
      );

      expect(statistics.getTimerValues().pauseMs).toBe(30 * 60 * 1000);
    });

    it("is undefined if no time log is finished today", () => {
      const statistics = new TimeLogStatistics([], at("10:00:00"));

      expect(statistics.getTimerValues().pauseMs).toBeUndefined();
    });

    it("is undefined while timer is running", () => {
      const running = TimeLogTestFactory.testRunningTimeLog(at("10:00:00"));
      const statistics = new TimeLogStatistics(
        [running, doneLog("08:00:00", 1)],
        at("10:30:00")
      );

      expect(statistics.getTimerValues().pauseMs).toBeUndefined();
    });

    it("is undefined if 8h are worked", () => {
      const statistics = new TimeLogStatistics(
        [doneLog("08:00:00", 8)],
        at("16:30:00")
      );

      expect(statistics.getTimerValues().pauseMs).toBeUndefined();
    });

    it("is undefined before 06:00", () => {
      const statistics = new TimeLogStatistics(
        [doneLog("04:00:00", 1)],
        at("05:30:00")
      );

      expect(statistics.getTimerValues().pauseMs).toBeUndefined();
    });

    it("is undefined from 17:00", () => {
      const statistics = new TimeLogStatistics(
        [doneLog("08:00:00", 2)],
        at("17:00:00")
      );

      expect(statistics.getTimerValues().pauseMs).toBeUndefined();
    });
  });
});

function todayWorkdayStart() {
  return withTime(TODAY, "09:00:00");
}

function testFulfilledTimeLog(date: Date, hours: number) {
  return new TimeLog({
    startTime: date,
    endTime: DateFns.addHours(date, hours),
  });
}
