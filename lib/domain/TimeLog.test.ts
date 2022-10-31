import TimeLog from "./TimeLog";
import {
  addDays,
  addHours,
  addSeconds,
  getMilliseconds,
  subDays,
  subSeconds,
} from "date-fns";
import { HOUR, todayWorkdayEnd } from "./time-constants";

const TODAY = todayWorkdayEnd();
const YESTERDAY = subDays(TODAY, 1);

describe("TimeLog", () => {
  describe("constructor", () => {
    it("resets milliseconds", () => {
      const timeLog = new TimeLog({ startTime: TODAY, endTime: TODAY });

      expect(getMilliseconds(timeLog.startTime)).toBe(0);
      expect(timeLog.endTime && getMilliseconds(timeLog.endTime)).toBe(0);
    });
  });

  describe("isValid()", () => {
    it("returns false if dates are at the same time", () => {
      const timeLog = new TimeLog({ startTime: TODAY, endTime: TODAY });

      expect(timeLog.isValid()).toBe(false);
    });

    it("returns true if start time is older", () => {
      const timeLog = new TimeLog({
        startTime: TODAY,
        endTime: addSeconds(TODAY, 1),
      });

      expect(timeLog.isValid()).toBe(true);
    });

    it("returns false if start time and end time have different date", () => {
      const timeLog = new TimeLog({
        startTime: TODAY,
        endTime: addDays(TODAY, 1),
      });

      expect(timeLog.isValid()).toBe(false);
    });
  });

  describe("isRunning()", () => {
    it("returns true if only start time is set", () => {
      const timeLog = new TimeLog({ startTime: TODAY });
      expect(timeLog.isRunning()).toBe(true);
    });

    it("returns false if start time and end time are set", () => {
      const timeLog = new TimeLog({ startTime: TODAY, endTime: TODAY });
      expect(timeLog.isRunning()).toBe(false);
    });
  });

  describe("isDone()", () => {
    it("returns false if only start time is set", () => {
      const timeLog = new TimeLog({ startTime: TODAY });
      expect(timeLog.isDone()).toBe(false);
    });

    it("returns true if start time and end time are set", () => {
      const timeLog = new TimeLog({ startTime: TODAY, endTime: TODAY });
      expect(timeLog.isDone()).toBe(true);
    });
  });

  describe("isDeletable()", () => {
    it("returns true if done", () => {
      const timeLog = new TimeLog({ startTime: TODAY, endTime: TODAY });
      expect(timeLog.isDeletable()).toBe(true);
    });

    it("returns true if running from yesterday", () => {
      const timeLog = new TimeLog({ startTime: YESTERDAY });
      expect(timeLog.isDeletable()).toBe(true);
    });

    it("returns false if running from today", () => {
      const timeLog = new TimeLog({ startTime: TODAY });
      expect(timeLog.isDeletable()).toBe(false);
    });
  });

  describe("getElapsedMs()", () => {
    it("returns 0 if done", () => {
      const timeLog = new TimeLog({ startTime: TODAY, endTime: TODAY });
      expect(timeLog.getElapsedMs(TODAY)).toBe(0);
    });

    it("returns milliseconds until provided time", () => {
      const timeLog = new TimeLog({ startTime: subSeconds(TODAY, 1) });
      expect(timeLog.getElapsedMs(TODAY)).toEqual(1000);
    });
  });

  describe("getDurationMs()", () => {
    it("returns 0 if running", () => {
      const timeLog = new TimeLog({
        startTime: TODAY,
      });

      expect(timeLog.getDurationMs()).toBe(0);
    });

    it("returns duration", () => {
      const timeLog = new TimeLog({
        startTime: TODAY,
        endTime: addHours(TODAY, 4),
      });

      expect(timeLog.getDurationMs()).toBe(4 * HOUR);
    });
  });
});
