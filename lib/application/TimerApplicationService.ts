import TimeLog from "../domain/TimeLog";
import TimeLogRepository from "../infrastructure/TimeLogRepository";
import { exportImportApplicationService } from "./ExportImportApplicationService";

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
    const endTime = new Date();

    const updatedTimeLog = new TimeLog({
      ...currentTimeLog,
      endTime,
    });
    await this.timeLogRepository.update(updatedTimeLog);

    await exportImportApplicationService.exportAllTimeLogsAfterWorkdayEnd(
      endTime
    );
  }
}

export const timerApplicationService = new TimerApplicationService();
