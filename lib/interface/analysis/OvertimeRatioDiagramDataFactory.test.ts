import { addDays, parseISO } from "date-fns";
import TimeLogTestFactory from "../../domain/TimeLogTestFactory";
import OvertimeRatioDiagramDataFactory from "./OvertimeRatioDiagramDataFactory";

const DAY = parseISO("2022-08-01");

describe("OvertimeRatioDiagramDataFactory", () => {
  describe("getData()", () => {
    it("returns empty list if no fulfilled time logs", () => {
      const timeLogDiagram = new OvertimeRatioDiagramDataFactory([
        TimeLogTestFactory.testRunningTimeLog(DAY),
      ]);

      expect(timeLogDiagram.createData()).toEqual([
        {
          name: "With overtime",
          count: 0,
        },
        {
          name: "Without overtime",
          count: 0,
        },
      ]);
    });

    it("groups by days if overtime exists", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "09:00:00",
        9
      );
      const timeLog2 = TimeLogTestFactory.testFulfilledTimeLog(
        addDays(DAY, 1),
        "09:00:00",
        1
      );

      const timeLogDiagram = new OvertimeRatioDiagramDataFactory([
        timeLog,
        timeLog2,
      ]);

      expect(timeLogDiagram.createData()).toEqual([
        {
          name: "With overtime",
          count: 1,
        },
        {
          name: "Without overtime",
          count: 1,
        },
      ]);
    });
  });
});
