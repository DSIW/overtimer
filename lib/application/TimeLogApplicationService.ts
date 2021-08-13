import TimeLog from "../domain/TimeLog";
import TimeLogRepository from "../infrastructure/TimeLogRepository";

export default class TimeLogApplicationService {
  private readonly timeLogRepository: TimeLogRepository;

  constructor() {
    this.timeLogRepository = new TimeLogRepository();
  }

  async getAllTimeLogs() {
    return await this.timeLogRepository.all();
  }

  async update(timeLog: TimeLog) {
    await this.timeLogRepository.update(timeLog);
  }

  async delete(timeLog: TimeLog) {
    await this.timeLogRepository.delete(timeLog);
  }
}

export const timeLogApplicationService = new TimeLogApplicationService();
