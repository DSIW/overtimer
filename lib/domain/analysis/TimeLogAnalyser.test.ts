import { addWeeks, parseISO } from "date-fns";
import TimeLogAnalyser from "./TimeLogAnalyser";
import TimeLogTestFactory from "../TimeLogTestFactory";

const DAY = parseISO("2022-08-01");

describe("TimeLogAnalyser", () => {
  describe("getStartTimeStatisticsPerWeekday()", () => {
    it("returns 0 if no fulfilled time logs", () => {
      const timeLogAnalyser = new TimeLogAnalyser([
        TimeLogTestFactory.testRunningTimeLog(DAY)
      ]);

      expect(timeLogAnalyser.getStartTimeStatisticsPerWeekday()).toEqual({});
    });

    it("returns map of day and time if one time log", () => {
      const timeLogAnalyser = new TimeLogAnalyser([
        TimeLogTestFactory.testFulfilledTimeLog(DAY, "09:00:00", 1)
      ]);

      expect(timeLogAnalyser.getStartTimeStatisticsPerWeekday()).toEqual({
        "Monday": {
          min: "09:00:00",
          median: "09:00:00",
          max: "09:00:00"
        }
      });
    });

    it("returns first start time of day and time if time logs are at same day", () => {
      const timeLogAnalyser = new TimeLogAnalyser([
        TimeLogTestFactory.testFulfilledTimeLog(DAY, "09:00:00", 1),
        TimeLogTestFactory.testFulfilledTimeLog(DAY, "13:00:00", 1)
      ]);

      expect(timeLogAnalyser.getStartTimeStatisticsPerWeekday()).toEqual({
        "Monday": {
          min: "09:00:00",
          median: "09:00:00",
          max: "09:00:00"
        }
      });
    });

    it("returns min, median and max start time of 2 different days", () => {
      const timeLogAnalyser = new TimeLogAnalyser([
        TimeLogTestFactory.testFulfilledTimeLog(DAY, "09:00:00", 1),
        TimeLogTestFactory.testFulfilledTimeLog(addWeeks(DAY, 1), "10:00:00", 1),
        TimeLogTestFactory.testFulfilledTimeLog(addWeeks(DAY, 2), "11:00:00", 1)
      ]);

      expect(timeLogAnalyser.getStartTimeStatisticsPerWeekday()).toEqual({
        "Monday": {
          min: "09:00:00",
          median: "10:00:00",
          max: "11:00:00"
        },
      });
    });
  });
});

