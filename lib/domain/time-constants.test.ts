import {
  startOfLastWeeks,
  startOfTimeRange,
  endOfTimeRange,
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

  describe("#startOfTimeRange for every option", () => {
    const someDayInNovember = new Date(2026, 10, 18, 15, 30);

    it.each([
      ["w4", 4],
      ["w8", 8],
      ["w12", 12],
      ["w26", 26],
      ["w52", 52],
    ])(
      "resolves %s to the Monday 00:00 of the week containing now minus %i weeks",
      (id, weeks) => {
        expect(startOfTimeRange(id, someDayInNovember)).toEqual(
          startOfLastWeeks(weeks as number, someDayInNovember)
        );
      }
    );

    it("resolves Q2 and Q4 to the first day of that quarter in the current year", () => {
      expect(startOfTimeRange("q2", someDayInNovember)).toEqual(
        new Date(2026, 3, 1)
      );
      expect(startOfTimeRange("q4", someDayInNovember)).toEqual(
        new Date(2026, 9, 1)
      );
    });

    it("uses last 8 weeks as the default option", () => {
      expect(startOfTimeRange(undefined, someDayInNovember)).toEqual(
        startOfLastWeeks(8, someDayInNovember)
      );
    });
  });

  describe("#visibleTimeRangeOptions at a quarter boundary", () => {
    const quarterIds = (today: Date) =>
      visibleTimeRangeOptions(today)
        .filter((option) => option.kind === "quarter")
        .map((option) => option.id);

    it("hides Q2 on the last moment of Q1", () => {
      expect(quarterIds(new Date(2026, 2, 31, 23, 59, 59))).toEqual(["q1"]);
    });

    it("offers Q2 from the first moment of Q2", () => {
      expect(quarterIds(new Date(2026, 3, 1, 0, 0, 0))).toEqual(["q1", "q2"]);
    });

    it("always offers every week range and this year", () => {
      for (const month of [0, 3, 6, 9]) {
        const ids = visibleTimeRangeOptions(new Date(2026, month, 1)).map(
          (option) => option.id
        );
        expect(ids).toEqual(
          expect.arrayContaining(["w4", "w8", "w12", "w26", "w52", "ytd"])
        );
      }
    });
  });

  describe("#endOfTimeRange for every option", () => {
    const someDayInNovember = new Date(2026, 10, 18);

    it("resolves Q2 and Q4 to the last moment of that quarter", () => {
      expect(endOfTimeRange("q2", someDayInNovember)).toEqual(
        new Date(2026, 5, 30, 23, 59, 59, 999)
      );
      expect(endOfTimeRange("q4", someDayInNovember)).toEqual(
        new Date(2026, 11, 31, 23, 59, 59, 999)
      );
    });

    it.each(["w4", "w12", "w26", "w52"])("is unbounded for %s", (id) => {
      expect(endOfTimeRange(id, someDayInNovember)).toBeUndefined();
    });
  });

  describe("#endOfTimeRange", () => {
    const someDayInJuly = new Date(2026, 6, 31);

    it("resolves a quarter option to the end of that quarter", () => {
      expect(endOfTimeRange("q1", someDayInJuly)).toEqual(
        new Date(2026, 2, 31, 23, 59, 59, 999)
      );
      expect(endOfTimeRange("q3", someDayInJuly)).toEqual(
        new Date(2026, 8, 30, 23, 59, 59, 999)
      );
    });

    it("is unbounded for all other options", () => {
      expect(endOfTimeRange("w8", someDayInJuly)).toBeUndefined();
      expect(endOfTimeRange("ytd", someDayInJuly)).toBeUndefined();
      expect(endOfTimeRange("unknown", someDayInJuly)).toBeUndefined();
    });
  });
});
