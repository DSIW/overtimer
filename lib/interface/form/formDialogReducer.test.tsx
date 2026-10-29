import { vi } from "vitest";
import { Payload, updateTime } from "./formDialogReducer";
import TimeLog from "../../domain/TimeLog";
import * as DateFns from "date-fns";

function testDate(): Date {
  const date = new Date();
  date.setHours(12);
  return date;
}

describe("formDialogReducer", () => {
  it("updates valid start time", () => {
    const timeLog = new TimeLog({ startTime: testDate() });

    const payload: Payload = {
      name: "startTime",
      hours: 1,
      minutes: 2,
    };

    const newState = updateTime({ timeLog, error: false }, payload);

    const startTime = newState.timeLog.startTime;
    expect(DateFns.getMinutes(startTime)).toEqual(2);
    expect(DateFns.getHours(startTime)).toEqual(1);
    expect(DateFns.getSeconds(startTime)).toEqual(0);
    expect(newState.error).toBe(false);
  });

  it("does not update running time log", () => {
    const timeLog = new TimeLog({ startTime: testDate() });

    const payload: Payload = {
      name: "endTime",
      hours: 1,
      minutes: 2,
    };

    const newState = updateTime({ timeLog, error: false }, payload);

    expect(newState.timeLog.endTime).toEqual(undefined);
    expect(newState.error).toBe(false);
  });

  it("updates endTime", () => {
    const timeLog = new TimeLog({ startTime: testDate(), endTime: testDate() });

    const hours = DateFns.getHours(timeLog.startTime) + 1;

    const payload: Payload = {
      name: "endTime",
      hours,
      minutes: 2,
    };

    const newState = updateTime({ timeLog, error: false }, payload);

    expect(newState.error).toBe(false);
    const endTime = newState.timeLog.endTime as Date;
    expect(DateFns.getMinutes(endTime)).toEqual(2);
    expect(DateFns.getHours(endTime)).toEqual(hours);
    expect(DateFns.getSeconds(endTime)).toEqual(0);
  });

  it("uses day of startTime for endTime if days are different", () => {
    const timeLog = new TimeLog({
      startTime: DateFns.subDays(testDate(), 1),
      endTime: testDate(),
    });

    const hours = DateFns.getHours(timeLog.startTime) + 1;

    const payload: Payload = {
      name: "endTime",
      hours,
      minutes: 0,
    };

    const newState = updateTime({ timeLog, error: false }, payload);

    expect(newState.error).toBe(false);
    const endTime = newState.timeLog.endTime as Date;
    expect(DateFns.getDay(endTime)).toEqual(DateFns.getDay(timeLog.startTime));
    expect(DateFns.getHours(endTime)).toEqual(hours);
    expect(DateFns.getMinutes(endTime)).toEqual(0);
    expect(DateFns.getSeconds(endTime)).toEqual(0);
  });

  it("does not update if time log is invalid", () => {
    const timeLog = new TimeLog({ startTime: testDate(), endTime: testDate() });

    const payload: Payload = {
      name: "endTime",
      hours: -99,
      minutes: 0,
    };

    const newState = updateTime({ timeLog, error: false }, payload);

    expect(newState.error).toBe(true);
    expect(newState.timeLog.endTime).toEqual(timeLog.endTime);
  });
});

describe("formDialogReducer with a fixed now", () => {
  // now: Wed, 2026-10-28 10:00
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-10-28T10:00:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  function running(start: string): TimeLog {
    return new TimeLog({ id: 1, startTime: new Date(start) });
  }

  function done(start: string, end: string): TimeLog {
    return new TimeLog({
      id: 1,
      startTime: new Date(start),
      endTime: new Date(end),
    });
  }

  describe("editing a running time log", () => {
    it("back-dates the start on the log's day", () => {
      const timeLog = running("2026-10-28T10:00:00");

      const newState = updateTime(
        { timeLog, error: false },
        { name: "startTime", hours: 8, minutes: 30 }
      );

      expect(newState.error).toBe(false);
      expect(newState.timeLog.startTime).toEqual(
        new Date("2026-10-28T08:30:00")
      );
      expect(newState.timeLog.isRunning()).toBe(true);
    });

    it("rejects a start in the future", () => {
      const timeLog = running("2026-10-28T09:00:00");

      const newState = updateTime(
        { timeLog, error: false },
        { name: "startTime", hours: 11, minutes: 0 }
      );

      expect(newState.error).toBe(true);
      expect(newState.timeLog.startTime).toEqual(timeLog.startTime);
    });

    it("rejects editing a log still running from a previous day", () => {
      const timeLog = running("2026-10-27T09:00:00");

      const newState = updateTime(
        { timeLog, error: false },
        { name: "startTime", hours: 8, minutes: 0 }
      );

      expect(newState.error).toBe(true);
      expect(newState.timeLog.startTime).toEqual(timeLog.startTime);
    });
  });

  describe("editing a done time log", () => {
    it("keeps an edited start on the log's day", () => {
      const timeLog = done("2026-10-26T09:00:00", "2026-10-26T17:00:00");

      const newState = updateTime(
        { timeLog, error: false },
        { name: "startTime", hours: 7, minutes: 15 }
      );

      expect(newState.error).toBe(false);
      expect(newState.timeLog.startTime).toEqual(
        new Date("2026-10-26T07:15:00")
      );
      expect(newState.timeLog.endTime).toEqual(new Date("2026-10-26T17:00:00"));
    });

    it("rejects an end equal to the start", () => {
      const timeLog = done("2026-10-26T09:00:00", "2026-10-26T17:00:00");

      const newState = updateTime(
        { timeLog, error: false },
        { name: "endTime", hours: 9, minutes: 0 }
      );

      expect(newState.error).toBe(true);
      expect(newState.timeLog.endTime).toEqual(timeLog.endTime);
    });

    it("rejects a start after the end", () => {
      const timeLog = done("2026-10-26T09:00:00", "2026-10-26T17:00:00");

      const newState = updateTime(
        { timeLog, error: false },
        { name: "startTime", hours: 18, minutes: 0 }
      );

      expect(newState.error).toBe(true);
      expect(newState.timeLog.startTime).toEqual(timeLog.startTime);
    });

    it("rejects clearing the end and keeps the log done", () => {
      const timeLog = done("2026-10-26T09:00:00", "2026-10-26T17:00:00");

      const newState = updateTime(
        { timeLog, error: false },
        { name: "endTime", hours: NaN, minutes: NaN }
      );

      expect(newState.error).toBe(true);
      expect(newState.timeLog.isDone()).toBe(true);
      expect(newState.timeLog.endTime).toEqual(timeLog.endTime);
    });
  });
});
