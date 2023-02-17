import { addDays, parseISO } from "date-fns";
import TimeLogTestFactory from "../TimeLogTestFactory";
import WeekdayDiagramDataFactory from "./WeekdayDiagramDataFactory";
import { HOUR } from "../time-constants";

const DAY = parseISO("2022-08-01");

describe("TimeLogDiagram", () => {
  describe("getData()", () => {
    it("returns 0 if no fulfilled time logs", () => {
      const timeLogDiagram = new WeekdayDiagramDataFactory([
        TimeLogTestFactory.testRunningTimeLog(DAY),
      ]);

      expect(timeLogDiagram.createData()).toEqual([]);
    });

    it("returns map of day and time if one time log", () => {
      const timeLogDiagram = new WeekdayDiagramDataFactory([
        TimeLogTestFactory.testFulfilledTimeLog(DAY, "09:00:00", 1),
      ]);

      expect(timeLogDiagram.createData()).toEqual([
        {
          weekday: "Monday",
          pauseMs: 0,
        },
      ]);
    });

    it("returns first start time of day and time if time logs are at same day", () => {
      const timeLogDiagram = new WeekdayDiagramDataFactory([
        TimeLogTestFactory.testFulfilledTimeLog(DAY, "09:00:00", 1),
        TimeLogTestFactory.testFulfilledTimeLog(DAY, "11:00:00", 1),
      ]);

      expect(timeLogDiagram.createData()).toEqual([
        {
          weekday: "Monday",
          pauseMs: 1 * HOUR,
        },
      ]);
    });

    it("returns min, median and max start time of 2 different days", () => {
      const timeLogDiagram = new WeekdayDiagramDataFactory([
        TimeLogTestFactory.testFulfilledTimeLog(DAY, "09:00:00", 1),
        TimeLogTestFactory.testFulfilledTimeLog(DAY, "11:00:00", 1),
        TimeLogTestFactory.testFulfilledTimeLog(addDays(DAY, 1), "09:00:00", 1),
        TimeLogTestFactory.testFulfilledTimeLog(addDays(DAY, 1), "12:00:00", 1),
      ]);

      expect(timeLogDiagram.createData()).toEqual([
        {
          weekday: "Monday",
          pauseMs: 1 * HOUR,
        },
        {
          weekday: "Tuesday",
          pauseMs: 2 * HOUR,
        },
      ]);
    });
  });
});
