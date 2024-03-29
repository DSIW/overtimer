import * as DateFns from "date-fns";
import TimeLogTestFactory from "../../../domain/TimeLogTestFactory";
import WeekdayDiagramDataFactory from "./WeekdayDiagramDataFactory";
import { HOUR } from "../../../domain/time-constants";

const DAY = DateFns.parseISO("2022-08-01");

describe("WeekdayDiagramDataFactory", () => {
  describe("getData()", () => {
    it("returns correct values if one time log", () => {
      const timeLogDiagram = new WeekdayDiagramDataFactory([
        TimeLogTestFactory.testFulfilledTimeLog(DAY, "09:00:00", 1),
      ]);

      expect(timeLogDiagram.createData()).toEqual([
        {
          weekday: "Monday",
          weekdayShort: "MON",
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
          weekdayShort: "MON",
          pause: 1 * HOUR,
          overtime: 0,
          work: 2 * HOUR,
        },
      ]);
    });

    it("returns correct values for 2 different days", () => {
      const tuesday = DateFns.addDays(DAY, 1);
      const timeLogDiagram = new WeekdayDiagramDataFactory([
        TimeLogTestFactory.testFulfilledTimeLog(DAY, "09:00:00", 1),
        TimeLogTestFactory.testFulfilledTimeLog(DAY, "11:00:00", 8),
        TimeLogTestFactory.testFulfilledTimeLog(tuesday, "09:00:00", 1),
        TimeLogTestFactory.testFulfilledTimeLog(tuesday, "12:00:00", 1),
      ]);

      expect(timeLogDiagram.createData()).toEqual([
        {
          weekday: "Monday",
          weekdayShort: "MON",
          pause: 1 * HOUR,
          overtime: 1 * HOUR,
          work: 8 * HOUR,
        },
        {
          weekday: "Tuesday",
          weekdayShort: "TUE",
          pause: 2 * HOUR,
          overtime: 0,
          work: 2 * HOUR,
        },
      ]);
    });
  });
});
