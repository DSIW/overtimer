import { addDays, addWeeks, parseISO } from "date-fns";
import TimeLogTestFactory from "../../domain/TimeLogTestFactory";
import { HOUR } from "../../domain/time-constants";
import OvertimeDiagramDataFactory from "./OvertimeDiagramDataFactory";

const DAY = parseISO("2022-08-01");

describe("OvertimeDiagramDataFactory", () => {
  describe("getData()", () => {
    it("returns 0 if no fulfilled time logs", () => {
      const timeLogDiagram = new OvertimeDiagramDataFactory([
        TimeLogTestFactory.testRunningTimeLog(DAY),
      ]);

      expect(timeLogDiagram.createData()).toEqual([]);
    });

    it("returns correct values if one time log", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "09:00:00",
        9
      );

      const timeLogDiagram = new OvertimeDiagramDataFactory([timeLog]);

      expect(timeLogDiagram.createData()).toEqual([
        {
          date: timeLog.startTime,
          name: "32/2022",
          overtime: 1 * HOUR,
          tooltipName: "CW 32/2022",
          cumulated: 1 * HOUR,
        },
      ]);
    });

    it("groups by week", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "09:00:00",
        9
      );
      const timeLog2 = TimeLogTestFactory.testFulfilledTimeLog(
        addDays(DAY, 1),
        "09:00:00",
        9
      );
      const timeLog3 = TimeLogTestFactory.testFulfilledTimeLog(
        addWeeks(DAY, 1),
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
          name: "32/2022",
          overtime: 2 * HOUR,
          tooltipName: "CW 32/2022",
          cumulated: 2 * HOUR,
        },
        {
          date: timeLog3.startTime,
          name: "33/2022",
          overtime: 1 * HOUR,
          tooltipName: "CW 33/2022",
          cumulated: 3 * HOUR,
        },
      ]);
    });
  });
});
