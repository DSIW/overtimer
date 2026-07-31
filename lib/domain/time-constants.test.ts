import {
  startOfLastWeeks,
  startOfTimeRange,
  todayWorkdayEnd,
  visibleTimeRangeOptions,
} from "./time-constants";

describe("time-constants", () => {
  describe("#todayWorkdayEnd", () => {
    it("is today at 17:00:00", () => {
      expect(todayWorkdayEnd().getDate()).toEqual(new Date().getDate());
      expect(todayWorkdayEnd().getHours()).toEqual(17);
      expect(todayWorkdayEnd().getMinutes()).toEqual(0);
      expect(todayWorkdayEnd().getSeconds()).toEqual(0);
    });
  });

  describe("#startOfLastWeeks", () => {
    it("starts one week before", () => {
      const someMonday = new Date(2021, 1, 1);
      expect(startOfLastWeeks(1, someMonday)).toEqual(
        new Date(2021, 0, 25, 0, 0, 0)
      );
    });

    it("starts with same day on Monday", () => {
      const someMonday = new Date(2021, 1, 1);
      expect(startOfLastWeeks(0, someMonday)).toEqual(
        new Date(2021, 1, 1, 0, 0, 0)
      );
    });

    it("starts with same weeks Monday on Friday", () => {
      const someFriday = new Date(2021, 1, 5);
      expect(startOfLastWeeks(0, someFriday)).toEqual(
        new Date(2021, 1, 1, 0, 0, 0)
      );
    });
  });

  describe("#startOfTimeRange", () => {
    const someDayInJuly = new Date(2026, 6, 31);

    it("resolves a weeks option to the same date as startOfLastWeeks", () => {
      expect(startOfTimeRange("w4", someDayInJuly)).toEqual(
        startOfLastWeeks(4, someDayInJuly)
      );
    });

    it("resolves the year-to-date option to the start of the year", () => {
      expect(startOfTimeRange("ytd", someDayInJuly)).toEqual(
        new Date(2026, 0, 1)
      );
    });

    it("resolves a quarter option to the start of that quarter in the current year", () => {
      expect(startOfTimeRange("q1", someDayInJuly)).toEqual(
        new Date(2026, 0, 1)
      );
      expect(startOfTimeRange("q3", someDayInJuly)).toEqual(
        new Date(2026, 6, 1)
      );
    });

    it("falls back to the default option for an unknown id", () => {
      expect(startOfTimeRange("unknown", someDayInJuly)).toEqual(
        startOfTimeRange("w8", someDayInJuly)
      );
    });
  });

  describe("#visibleTimeRangeOptions", () => {
    it("only includes quarters up to and including the current one", () => {
      const someDayInQ3 = new Date(2026, 6, 31);
      const ids = visibleTimeRangeOptions(someDayInQ3).map(
        (option) => option.id
      );
      expect(ids).toEqual([
        "w4",
        "w8",
        "w12",
        "w26",
        "w52",
        "ytd",
        "q1",
        "q2",
        "q3",
      ]);
    });

    it("only includes Q1 during the first quarter", () => {
      const someDayInQ1 = new Date(2026, 1, 1);
      const ids = visibleTimeRangeOptions(someDayInQ1).map(
        (option) => option.id
      );
      expect(ids).toEqual(["w4", "w8", "w12", "w26", "w52", "ytd", "q1"]);
    });

    it("includes all quarters during the fourth quarter", () => {
      const someDayInQ4 = new Date(2026, 11, 1);
      const ids = visibleTimeRangeOptions(someDayInQ4).map(
        (option) => option.id
      );
      expect(ids).toEqual([
        "w4",
        "w8",
        "w12",
        "w26",
        "w52",
        "ytd",
        "q1",
        "q2",
        "q3",
        "q4",
      ]);
    });
  });
});
