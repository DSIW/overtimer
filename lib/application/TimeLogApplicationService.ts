import TimeLog from "../domain/TimeLog";
import TimeLogRepository from "../infrastructure/TimeLogRepository";
import { subWeeks } from "date-fns";
import { WEEK_LIMIT } from "../domain/time-constants";

export default class TimeLogApplicationService {
  private readonly timeLogRepository: TimeLogRepository;

  constructor() {
    this.timeLogRepository = new TimeLogRepository();
  }

  async getAllCount() {
    return await this.timeLogRepository.count();
  }

  async getAllRecentTimeLogs() {
    const recentLimitDate = subWeeks(new Date(), WEEK_LIMIT);
    return await this.timeLogRepository.allBefore(recentLimitDate);
  }

  async update(timeLog: TimeLog) {
    await this.timeLogRepository.update(timeLog);
  }

  async delete(timeLog: TimeLog) {
    await this.timeLogRepository.delete(timeLog);
  }
}

export const timeLogApplicationService = new TimeLogApplicationService();
