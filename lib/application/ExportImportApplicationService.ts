import { compareAsc, intervalToDuration } from "date-fns";
import TimeLog from "../domain/TimeLog";
import TimeLogRepository from "../infrastructure/TimeLogRepository";

export default class ExportImportApplicationService {
    private readonly timeLogRepository: TimeLogRepository

    constructor() {
        this.timeLogRepository = new TimeLogRepository()
        this.backupRepository = new BackupRepository()
    }

    private async getLastTimeLog() {
        return await this.timeLogRepository.all()
    }

    async getLastBackupInformation() {
        const lastBackup = await this.backupRepository.getNewest()
        const lastTimeLog = await this.timeLogRepository.getNewest()

        if (lastTimeLog === undefined) {
            return {
                isBackupNecessary: false,
                days: 0
            }
        }

        const days = intervalToDuration({ start: new Date(), end: lastBackup.creationTime }).days
        const lastBackupOlderThanLastTimeLog = compareAsc(lastBackup.creationTime, lastTimeLog.startTime) === -1

        const isBackupNecessary = days && days > 0 && lastBackupOlderThanLastTimeLog

        return {
            isBackupNecessary,
            days
        }
    }

    async import(timeLogs: TimeLog[]) {
        await this.timeLogRepository.deleteAll()
        await this.timeLogRepository.saveAll(timeLogs)
    }
}

export const exportImportApplicationService = new ExportImportApplicationService()