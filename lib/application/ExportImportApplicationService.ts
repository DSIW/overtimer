import TimeLog from "../domain/TimeLog";
import TimeLogRepository from "../infrastructure/TimeLogRepository";

export default class ExportImportApplicationService {
    private readonly timeLogRepository: TimeLogRepository

    constructor() {
        this.timeLogRepository = new TimeLogRepository()
    }

    async getAllTimeLogs() {
        return await this.timeLogRepository.all()
    }

    async import(timeLogs: TimeLog[]) {
        await this.timeLogRepository.deleteAll()
        await this.timeLogRepository.saveAll(timeLogs)
    }
}

export const exportImportApplicationService = new ExportImportApplicationService()