import { startOfLastWeeks, todayWorkdayEnd } from "./time-constants";

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
});
