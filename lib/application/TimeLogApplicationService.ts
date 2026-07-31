import TimeLog from "../domain/TimeLog";
import TimeLogRepository from "../infrastructure/TimeLogRepository";
import {
  startOfTimeRange,
  DEFAULT_TIME_RANGE_OPTION_ID,
} from "../domain/time-constants";

export default class TimeLogApplicationService {
  private readonly timeLogRepository: TimeLogRepository;

  constructor() {
    this.timeLogRepository = new TimeLogRepository();
  }

  async getAllCount() {
    return await this.timeLogRepository.count();
  }

  async getAllRecentTimeLogs(
    timeRangeOptionId: string = DEFAULT_TIME_RANGE_OPTION_ID
  ) {
    const recentLimitDate = startOfTimeRange(timeRangeOptionId);
    return await this.timeLogRepository.allBefore(recentLimitDate);
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
