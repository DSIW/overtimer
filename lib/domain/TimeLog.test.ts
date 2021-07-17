import TimeLog from "./TimeLog"
import {addHours, getMilliseconds} from 'date-fns'

const HOURS = 1000 * 60 * 60
const NOW = new Date()

describe("TimeLog", () => {
  describe("constructor", () => {
    it("resets milliseconds", () => {
      const timeLog = new TimeLog({startTime: NOW, endTime: NOW})

      expect(getMilliseconds(timeLog.startTime)).toBe(0)
      expect(timeLog.endTime && getMilliseconds(timeLog.endTime)).toBe(0)
    });
  });

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

      expect(timeLog.getDurationMs()).toBe(4 * HOURS)
    });
  });
})
