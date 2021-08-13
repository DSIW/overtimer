import TimeLog from "../domain/TimeLog";
import TimeLogRepository from "../infrastructure/TimeLogRepository";

export default class TimerApplicationService {
  private readonly timeLogRepository: TimeLogRepository;

  constructor() {
    this.timeLogRepository = new TimeLogRepository();
  }

  async start() {
    const timeLog = TimeLog.startedNow();
    await this.timeLogRepository.save(timeLog);
  }

  async stop(currentTimeLog: TimeLog) {
    const updatedTimeLog = new TimeLog({
      ...currentTimeLog,
      endTime: new Date(),
    });
    await this.timeLogRepository.update(updatedTimeLog);
  }
}

export const timerApplicationService = new TimerApplicationService();
