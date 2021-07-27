import TimeLog from "../domain/TimeLog"
import IndexDb from "./IndexDb";

export default class TimeLogRepository {
  private db: IndexDb;

  constructor() {
    this.db = new IndexDb();
    this.db.timeLogs.mapToClass(TimeLog);
  }

  async all(): Promise<TimeLog[]> {
    const records = await this.db.timeLogs.orderBy("startTime").reverse().toArray();
    return records.map(record => new TimeLog({...record}))
  }

  async save(timeLog: TimeLog): Promise<void> {
    await this.db.timeLogs.put(timeLog)
  }

  async saveAll(timeLogs: TimeLog[]): Promise<void> {
    await this.db.timeLogs.bulkPut(timeLogs)
  }

  async update(timeLog: TimeLog): Promise<void> {
    if (timeLog.id === undefined) {
      throw new Error("Only persisted time logs can be updated")
    }

    await this.db.timeLogs.put(timeLog, timeLog.id)
  }

  async delete(timeLog: TimeLog): Promise<void> {
    if (timeLog.id === undefined) {
      throw new Error("Only persisted time logs can be deleted")
    }

    await this.db.timeLogs.delete(timeLog.id)
  }

  async deleteAll(): Promise<void> {
    await this.db.timeLogs.clear()
  }
}

export const timeLogRepository = new TimeLogRepository()
