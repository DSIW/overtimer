import TimeLogRepository from "../infrastructure/TimeLogRepository";
import TimeLogsFile from "../infrastructure/TimeLogsFile";
import { format, isAfter } from "date-fns";
import { todayWorkdayEnd } from "../domain/time-constants";

export default class ExportImportApplicationService {
  private readonly timeLogRepository: TimeLogRepository;

  constructor() {
    this.timeLogRepository = new TimeLogRepository();
  }

  async importFile(file: File) {
    const timeLogs = await new TimeLogsFile().read(file);
    if (timeLogs.length > 0) {
      await this.timeLogRepository.deleteAll();
      await this.timeLogRepository.saveAll(timeLogs);
    }
  }

  async exportAllTimeLogs() {
    const timeLogs = await this.timeLogRepository.all();
    const fileName = `${format(new Date(), "yyyy-MM-dd_HH-mm")}_overtimer.json`;
    await new TimeLogsFile().write(fileName, timeLogs);
  }

  async exportAllTimeLogsAfterWorkdayEnd(date: Date) {
    const afterWorkday = isAfter(date, todayWorkdayEnd());
    if (afterWorkday) {
      await this.exportAllTimeLogs();
    }
  }
}

export const exportImportApplicationService =
  new ExportImportApplicationService();
