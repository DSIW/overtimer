import TimeLogRepository from "../infrastructure/TimeLogRepository";

export default class TimerApplicationService {
    private readonly timeLogRepository: TimeLogRepository

    constructor() {
        this.timeLogRepository = new TimeLogRepository()
    }

    async getAllTimeLogs() {
        return await this.timeLogRepository.all()
    }
}

export const timerApplicationService = new TimerApplicationService()