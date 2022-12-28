import { parseISO } from "date-fns";
import { withTime } from "../time-constants";
import TimeStatistic from "./TimeStatistic";

const DAY = parseISO("2022-08-01");

const NINE = withTime(DAY, "09:00:00");
const TEN = withTime(DAY, "10:00:00");
const ELEVEN = withTime(DAY, "11:00:00");

describe("TimeStatistic", () => {
  describe("getTimeStatistics()", () => {
    it("returns min, median and max", () => {
      const timeStatistic = new TimeStatistic([NINE, TEN, ELEVEN]);

      expect(timeStatistic.getTimeStatistics()).toEqual({
        min: NINE,
        median: TEN,
        max: ELEVEN,
      });
    });

    it("returns min, median and max of 2 same numbers", () => {
      const timeStatistic = new TimeStatistic([NINE, ELEVEN, ELEVEN]);

      expect(timeStatistic.getTimeStatistics()).toEqual({
        min: NINE,
        median: ELEVEN,
        max: ELEVEN,
      });
    });
  });
});
