import TimeLog from "./TimeLog"
import TimeLogStatistics from "./TimeLogStatistics"
import { addHours, subDays } from 'date-fns'

const HOURS = 1000*60*60
const YESTERDAY = subDays(new Date(), 1)

describe("TimeLogStatistics", () => {
  describe("getTotalOvertimeMs", () => {
    it("returns 0 if no time logs", () => {
      const overtimeMs = new TimeLogStatistics([]).getTotalOvertimeMs()

      expect(overtimeMs).toBe(0)
    })

    it("returns 0 if today's time log is running", () => {
      const currentTimeLog = new TimeLog({
        startTime: new Date()
      })

      const overtimeMs = new TimeLogStatistics([currentTimeLog]).getTotalOvertimeMs()

      expect(overtimeMs).toBe(0)
    })

    it("returns 1h if yesterday's time log has duration of 9h", () => {
      const currentTimeLog = new TimeLog({
        startTime: YESTERDAY,
        endTime: addHours(YESTERDAY, 8+1)
      })

      const overtimeMs = new TimeLogStatistics([currentTimeLog]).getTotalOvertimeMs()

      expect(overtimeMs).toBe(1*HOURS)
    })

    it("returns -1h if yesterday's time log has duration of 7h", () => {
      const currentTimeLog = new TimeLog({
        startTime: YESTERDAY,
        endTime: addHours(YESTERDAY, 8-1)
      })

      const overtimeMs = new TimeLogStatistics([currentTimeLog]).getTotalOvertimeMs()

      expect(overtimeMs).toBe(-1*HOURS)
    })

    it("returns 0h if todays's time log has duration of 7h", () => {
      const currentTimeLog = new TimeLog({
        startTime: new Date(),
        endTime: addHours(new Date(), 8-1)
      })

      const overtimeMs = new TimeLogStatistics([currentTimeLog]).getTotalOvertimeMs()

      expect(overtimeMs).toBe(0)
    })

    it("returns 1h if todays's time log has duration of 9h", () => {
      const currentTimeLog = new TimeLog({
        startTime: new Date(),
        endTime: addHours(new Date(), 8+1)
      })

      const overtimeMs = new TimeLogStatistics([currentTimeLog]).getTotalOvertimeMs()

      expect(overtimeMs).toBe(1*HOURS)
    })

    it("returns 2h if yesterday's and todays's time log has duration of 9h", () => {
      const yesterdayTimeLog = new TimeLog({
        startTime: YESTERDAY,
        endTime: addHours(YESTERDAY, 8+1)
      })

      const currentTimeLog = new TimeLog({
        startTime: new Date(),
        endTime: addHours(new Date(), 8+1)
      })

      const overtimeMs = new TimeLogStatistics([currentTimeLog, yesterdayTimeLog]).getTotalOvertimeMs()

      expect(overtimeMs).toBe(2*HOURS)
    })
  })
})