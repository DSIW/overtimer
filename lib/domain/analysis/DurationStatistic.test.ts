import DurationStatistic from "./DurationStatistic";
import { HOUR } from "../time-constants";

describe("DurationStatistic", () => {
  describe("getStatistics()", () => {
    it("returns min, median and max", () => {
      expect(
        new DurationStatistic().getStatistics([9 * HOUR, 11 * HOUR, 10 * HOUR])
      ).toEqual({
        min: `9 h`,
        median: `10 h`,
        max: `11 h`,
      });
    });
  });
});
