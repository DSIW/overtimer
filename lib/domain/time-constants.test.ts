import { todayWorkdayEnd } from "./time-constants";

describe("time-constants", () => {
  describe("#todayWorkdayEnd", () => {
    it("is today at 17:00:00", () => {
      expect(todayWorkdayEnd().getDate()).toEqual(new Date().getDate());
      expect(todayWorkdayEnd().getHours()).toEqual(17);
      expect(todayWorkdayEnd().getMinutes()).toEqual(0);
      expect(todayWorkdayEnd().getSeconds()).toEqual(0);
    });
  });
});
