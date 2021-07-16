import TimeLog from "./TimeLog"
import { addHours, subDays } from 'date-fns'

const HOURS = 1000*60*60

describe("TimeLog", () => {
  describe("getDuration()", () => {
    it("returns 0 if running", () => {
      const timeLog = new TimeLog({
        startTime: new Date()
      })

      expect(timeLog.getDurationMs()).toBe(0)
    });

    it("returns duration", () => {
      const timeLog = new TimeLog({
        startTime: new Date(),
        endTime: addHours(new Date(), 4)
      })

      expect(timeLog.getDurationMs()).toBe(4*HOURS)
    });
  });
})
