import DurationStatistic from "./DurationStatistic";
import { HOUR } from "../time-constants";

describe("DurationStatistic", () => {
  describe("getStatistics()", () => {
    it("returns min, median and max of one element", () => {
      expect(new DurationStatistic().getStatistics([9*HOUR])).toEqual({
        min: `9 h`,
        median: `9 h`,
        max: `9 h`,
      });
    });

    it("returns min, median and max", () => {
      expect(new DurationStatistic().getStatistics([9*HOUR, 11*HOUR, 10*HOUR])).toEqual({
        min: `9 h`,
        median: `10 h`,
        max: `11 h`,
      });
    });

    it("uses lower center element for median if there is no center element", () => {
      expect(new DurationStatistic().getStatistics([9*HOUR, 11*HOUR, 12*HOUR, 10*HOUR])).toEqual({
        min: `9 h`,
        median: `10 h`,
        max: `12 h`,
      });
    });

    it("returns min, median and max of 2 same numbers", () => {
      expect(new DurationStatistic().getStatistics([9*HOUR, 11*HOUR, 11*HOUR])).toEqual({
        min: `9 h`,
        median: `11 h`,
        max: `11 h`,
      });
    });
  });
});
