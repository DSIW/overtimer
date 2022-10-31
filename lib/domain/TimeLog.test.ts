import TimeLog from "./TimeLog";
import { addDays, addHours, addSeconds, getMilliseconds } from "date-fns";
import { HOUR, todayWorkdayEnd } from "./time-constants";

export const dateTime = todayWorkdayEnd();

describe("TimeLog", () => {
  describe("constructor", () => {
    it("resets milliseconds", () => {
      const timeLog = new TimeLog({ startTime: dateTime, endTime: dateTime });

      expect(getMilliseconds(timeLog.startTime)).toBe(0);
      expect(timeLog.endTime && getMilliseconds(timeLog.endTime)).toBe(0);
    });
  });

  describe("isValid()", () => {
    it("returns false if dates are at the same time", () => {
      const timeLog = new TimeLog({ startTime: dateTime, endTime: dateTime });

      expect(timeLog.isValid()).toBe(false);
    });

    it("returns true if start time is older", () => {
      const timeLog = new TimeLog({
        startTime: dateTime,
        endTime: addSeconds(dateTime, 1),
      });

      expect(timeLog.isValid()).toBe(true);
    });

    it("returns false if start time and end time have different date", () => {
      const timeLog = new TimeLog({
        startTime: dateTime,
        endTime: addDays(dateTime, 1),
      });

      expect(timeLog.isValid()).toBe(false);
    });
  });

  describe("getDuration()", () => {
    it("returns 0 if running", () => {
      const timeLog = new TimeLog({
        startTime: new Date(),
      });

      expect(timeLog.getDurationMs()).toBe(0);
    });

    it("returns duration", () => {
      const timeLog = new TimeLog({
        startTime: new Date(),
        endTime: addHours(new Date(), 4),
      });

      expect(timeLog.getDurationMs()).toBe(4 * HOUR);
    });
  });
});
