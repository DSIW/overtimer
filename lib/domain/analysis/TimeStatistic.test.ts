import * as DateFns from "date-fns";
import { withTime } from "../time-constants";
import TimeStatistic from "./TimeStatistic";

const DAY = DateFns.parseISO("2022-08-01");

const NINE = withTime(DAY, "09:00:00");
const TEN = withTime(DAY, "10:00:00");
const ELEVEN = withTime(DAY, "11:00:00");

describe("TimeStatistic", () => {
  describe("getStatistics()", () => {
    it("returns min, median and max", () => {
      const timeStatistic = new TimeStatistic();

      expect(timeStatistic.getStatistics([NINE, TEN, ELEVEN])).toEqual({
        min: "09:00:00",
        median: "10:00:00",
        max: "11:00:00",
      });
    });
  });
});
