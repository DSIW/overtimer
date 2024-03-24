import * as DateFns from "date-fns";
import TimeLogTestFactory from "../../../domain/TimeLogTestFactory";
import OvertimeRatioDiagramDataFactory from "./OvertimeRatioDiagramDataFactory";

const DAY = DateFns.parseISO("2022-08-01");

describe("OvertimeRatioDiagramDataFactory", () => {
  describe("getData()", () => {
    it("groups by days if overtime exists", () => {
      const timeLog = TimeLogTestFactory.testFulfilledTimeLog(
        DAY,
        "09:00:00",
        9
      );
      const timeLog2 = TimeLogTestFactory.testFulfilledTimeLog(
        DateFns.addDays(DAY, 1),
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
