import TimeLog from "../TimeLog";
import { addDays, addHours, addWeeks, parseISO } from "date-fns";
import { withTime } from "../time-constants";
import TimeLogAnalyser from "./TimeLogAnalyser";

const DAY = parseISO("2022-08-01");

describe("TimeLogAnalyser", () => {
  describe("getAverageStartTimePerWeekday()", () => {
    it("returns 0 if no fulfilled time logs", () => {
      const timeLogAnalyser = new TimeLogAnalyser([
        testRunningTimeLog(DAY)
      ]);

      expect(timeLogAnalyser.getAverageStartTimePerWeekday()).toEqual({});
    });

    it("returns map of day and time if one time log", () => {
      const timeLogAnalyser = new TimeLogAnalyser([
        testFulfilledTimeLog(DAY, "09:00:00", 1)
      ]);

      expect(timeLogAnalyser.getAverageStartTimePerWeekday()).toEqual({
        "Monday": {
          min: "09:00:00",
          max: "09:00:00"
        }
      });
    });

    it("returns first start time of day and time if time logs are at same day", () => {
      const timeLogAnalyser = new TimeLogAnalyser([
        testFulfilledTimeLog(DAY, "09:00:00", 1),
        testFulfilledTimeLog(DAY, "13:00:00", 1)
      ]);

      expect(timeLogAnalyser.getAverageStartTimePerWeekday()).toEqual({
        "Monday": {
          min: "09:00:00",
          max: "09:00:00"
        }
      });
    });

    it("returns max start time of 2 different days", () => {
      const timeLogAnalyser = new TimeLogAnalyser([
        testFulfilledTimeLog(DAY, "09:00:00", 1),
        testFulfilledTimeLog(addWeeks(DAY, 1), "10:00:00", 1)
      ]);

      expect(timeLogAnalyser.getAverageStartTimePerWeekday()).toEqual({
        "Monday": {
          min: "09:00:00",
          max: "10:00:00"
        },
      });
    });
  });
});

function testFulfilledTimeLog(date: Date, formattedStartTime: string, hours: number) {
  const startTime = withTime(date, formattedStartTime);
  return new TimeLog({
    startTime: startTime,
    endTime: addHours(startTime, hours),
  });
}

function testRunningTimeLog(date: Date) {
  return new TimeLog({ startTime: date });
}

function mapOf(record: Record<string, any>) {
  const map = new Map();

  Object.entries(record).forEach(([key, value]) => {
    map.set(key, value);
  });

  return map;
}
