import * as DateFns from "date-fns";
import TimeLogTestFactory from "../../../domain/TimeLogTestFactory";
import { HOUR } from "../../../domain/time-constants";
import OvertimeDiagramDataFactory from "./OvertimeDiagramDataFactory";

const DAY = DateFns.parseISO("2022-08-01");

describe("OvertimeDiagramDataFactory", () => {
  describe("getData()", () => {
    it("groups by week", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "09:00:00",
        9
      );
      const timeLog2 = TimeLogTestFactory.testFulfilledTimeLog(
        DateFns.addDays(DAY, 1),
        "09:00:00",
        9
      );
      const timeLog3 = TimeLogTestFactory.testFulfilledTimeLog(
        DateFns.addWeeks(DAY, 1),
        "09:00:00",
        9
      );

      const timeLogDiagram = new OvertimeDiagramDataFactory([
        timeLog,
        timeLog2,
        timeLog3,
      ]);

      expect(timeLogDiagram.createData()).toEqual([
        {
          date: timeLog.startTime,
          name: "32",
          overtime: 2 * HOUR,
          tooltipName: "CW 32",
          cumulated: 2 * HOUR,
        },
        {
          date: timeLog3.startTime,
          name: "33",
          overtime: 1 * HOUR,
          tooltipName: "CW 33",
          cumulated: 3 * HOUR,
        },
      ]);
    });

    it("groups by month if more than one year", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "09:00:00",
        9
      );
      const timeLog2 = TimeLogTestFactory.testFulfilledTimeLog(
        DateFns.addYears(DAY, 1),
        "09:00:00",
        9
      );

      const timeLogDiagram = new OvertimeDiagramDataFactory([
        timeLog,
        timeLog2,
      ]);

      expect(timeLogDiagram.createData()).toEqual([
        {
          date: timeLog.startTime,
          name: "Aug 2022",
          overtime: 1 * HOUR,
          tooltipName: "Aug 2022",
          cumulated: 1 * HOUR,
        },
        {
          date: timeLog2.startTime,
          name: "Aug 2023",
          overtime: 1 * HOUR,
          tooltipName: "Aug 2023",
          cumulated: 2 * HOUR,
        },
      ]);
    });
  });
});
