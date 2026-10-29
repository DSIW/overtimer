import { vi } from "vitest";
import TimeLog from "./TimeLog";
import * as DateFns from "date-fns";
import { HOUR, todayWorkdayEnd } from "./time-constants";

const TODAY = todayWorkdayEnd();
const YESTERDAY = DateFns.subDays(TODAY, 1);

describe("TimeLog", () => {
  describe("constructor", () => {
    it("resets milliseconds", () => {
      const timeLog = new TimeLog({ startTime: TODAY, endTime: TODAY });

      expect(DateFns.getMilliseconds(timeLog.startTime)).toBe(0);
      expect(timeLog.endTime && DateFns.getMilliseconds(timeLog.endTime)).toBe(
        0
      );
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
        endTime: DateFns.addSeconds(TODAY, 1),
      });

      expect(timeLog.isValid()).toBe(true);
    });

    it("returns false if start time and end time have different date", () => {
      const timeLog = new TimeLog({
        startTime: TODAY,
        endTime: DateFns.addDays(TODAY, 1),
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
      const timeLog = new TimeLog({ startTime: DateFns.subSeconds(TODAY, 1) });
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
        endTime: DateFns.addHours(TODAY, 4),
      });

      expect(timeLog.getDurationMs()).toBe(4 * HOUR);
    });
  });
});

describe("TimeLog#isEmptyAt()", () => {
  const startTime = new Date("2026-10-28T08:00:00.400");

  it("is empty within the second it was started", () => {
    const timeLog = new TimeLog({ startTime });

    expect(timeLog.isEmptyAt(new Date("2026-10-28T08:00:00.900"))).toBe(true);
  });

  it("is not empty one second later", () => {
    const timeLog = new TimeLog({ startTime });

    expect(timeLog.isEmptyAt(new Date("2026-10-28T08:00:01.000"))).toBe(false);
  });
});

describe("TimeLog#isValid() for a running time log", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-10-28T10:00:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("is valid if it started earlier today", () => {
    const timeLog = new TimeLog({ startTime: new Date("2026-10-28T08:00:00") });

    expect(timeLog.isValid()).toBe(true);
  });

  it("is invalid if it starts in the future", () => {
    const timeLog = new TimeLog({ startTime: new Date("2026-10-28T11:00:00") });

    expect(timeLog.isValid()).toBe(false);
  });

  it("is invalid if it starts now", () => {
    const timeLog = new TimeLog({ startTime: new Date("2026-10-28T10:00:00") });

    expect(timeLog.isValid()).toBe(false);
  });

  it("is invalid if it started on a previous day", () => {
    const timeLog = new TimeLog({ startTime: new Date("2026-10-27T08:00:00") });

    expect(timeLog.isValid()).toBe(false);
  });
});

describe("TimeLog#isDeletable() relative to now", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-10-28T00:30:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows deleting a log still running from before midnight", () => {
    const timeLog = new TimeLog({ startTime: new Date("2026-10-27T23:00:00") });

    expect(timeLog.isDeletable()).toBe(true);
  });

  it("forbids deleting a log running since today", () => {
    const timeLog = new TimeLog({ startTime: new Date("2026-10-28T00:10:00") });

    expect(timeLog.isDeletable()).toBe(false);
  });
});
