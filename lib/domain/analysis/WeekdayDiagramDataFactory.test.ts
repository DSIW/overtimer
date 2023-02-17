import { addDays, parseISO } from "date-fns";
import TimeLogTestFactory from "../TimeLogTestFactory";
import WeekdayDiagramDataFactory from "./WeekdayDiagramDataFactory";
import { HOUR } from "../time-constants";

const DAY = parseISO("2022-08-01");

describe("WeekdayDiagramDataFactory", () => {
  describe("getData()", () => {
    it("returns 0 if no fulfilled time logs", () => {
      const timeLogDiagram = new WeekdayDiagramDataFactory([
        TimeLogTestFactory.testRunningTimeLog(DAY),
      ]);

      expect(timeLogDiagram.createData()).toEqual([]);
    });

    it("returns correct values if one time log", () => {
      const timeLogDiagram = new WeekdayDiagramDataFactory([
        TimeLogTestFactory.testFulfilledTimeLog(DAY, "09:00:00", 1),
      ]);

      expect(timeLogDiagram.createData()).toEqual([
        {
          weekday: "Monday",
          pause: 0,
          overtime: 0,
          work: 1 * HOUR,
        },
      ]);
    });

    it("returns correct values if time logs are at same day", () => {
      const timeLogDiagram = new WeekdayDiagramDataFactory([
        TimeLogTestFactory.testFulfilledTimeLog(DAY, "09:00:00", 1),
        TimeLogTestFactory.testFulfilledTimeLog(DAY, "11:00:00", 1),
      ]);

      expect(timeLogDiagram.createData()).toEqual([
        {
          weekday: "Monday",
          pause: 1 * HOUR,
          overtime: 0,
          work: 2 * HOUR,
        },
      ]);
    });

    it("returns correct values for 2 different days", () => {
      const tuesday = addDays(DAY, 1);
      const timeLogDiagram = new WeekdayDiagramDataFactory([
        TimeLogTestFactory.testFulfilledTimeLog(DAY, "09:00:00", 1),
        TimeLogTestFactory.testFulfilledTimeLog(DAY, "11:00:00", 8),
        TimeLogTestFactory.testFulfilledTimeLog(tuesday, "09:00:00", 1),
        TimeLogTestFactory.testFulfilledTimeLog(tuesday, "12:00:00", 1),
      ]);

      expect(timeLogDiagram.createData()).toEqual([
        {
          weekday: "Monday",
          pause: 1 * HOUR,
          overtime: 1 * HOUR,
          work: 8 * HOUR,
        },
        {
          weekday: "Tuesday",
          pause: 2 * HOUR,
          overtime: 0,
          work: 2 * HOUR,
        },
      ]);
    });
  });
});
