import TimeLog from "../domain/TimeLog";
import TimeLogRepository from "../infrastructure/TimeLogRepository";

export default class TimerApplicationService {
    private readonly timeLogRepository: TimeLogRepository

    constructor() {
        this.timeLogRepository = new TimeLogRepository()
    }

    async getAllTimeLogs() {
        return await this.timeLogRepository.all()
    }

    async start() {
      const timeLog = TimeLog.startedNow()
      await this.timeLogRepository.save(timeLog)
    }

    async stop(currentTimeLog: TimeLog) {
      const updatedTimeLog = new TimeLog({ ...currentTimeLog, endTime: new Date() })
      await this.update(updatedTimeLog)
    }

    async update(timeLog: TimeLog) {
      await this.timeLogRepository.update(timeLog)
    }

    async delete(timeLog: TimeLog) {
      await this.timeLogRepository.delete(timeLog)
    }
}

export const timerApplicationService = new TimerApplicationService()