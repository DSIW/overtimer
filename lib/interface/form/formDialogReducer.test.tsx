import { Payload, updateTime } from "./formDialogReducer";
import TimeLog from "../../domain/TimeLog";
import { getDay, getHours, getMinutes, getSeconds, subDays } from "date-fns";

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
    expect(getMinutes(startTime)).toEqual(2);
    expect(getHours(startTime)).toEqual(1);
    expect(getSeconds(startTime)).toEqual(0);
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

    const hours = getHours(timeLog.startTime) + 1;

    const payload: Payload = {
      name: "endTime",
      hours,
      minutes: 2,
    };

    const newState = updateTime({ timeLog, error: false }, payload);

    expect(newState.error).toBe(false);
    const endTime = newState.timeLog.endTime as Date;
    expect(getMinutes(endTime)).toEqual(2);
    expect(getHours(endTime)).toEqual(hours);
    expect(getSeconds(endTime)).toEqual(0);
  });

  it("uses day of startTime for endTime if days are different", () => {
    const timeLog = new TimeLog({
      startTime: subDays(testDate(), 1),
      endTime: testDate(),
    });

    const hours = getHours(timeLog.startTime) + 1;

    const payload: Payload = {
      name: "endTime",
      hours,
      minutes: 0,
    };

    const newState = updateTime({ timeLog, error: false }, payload);

    expect(newState.error).toBe(false);
    const endTime = newState.timeLog.endTime as Date;
    expect(getDay(endTime)).toEqual(getDay(timeLog.startTime));
    expect(getHours(endTime)).toEqual(hours);
    expect(getMinutes(endTime)).toEqual(0);
    expect(getSeconds(endTime)).toEqual(0);
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
