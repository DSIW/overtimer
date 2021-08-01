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
    await this._requestPersistence()
  }

  async saveAll(timeLogs: TimeLog[]): Promise<void> {
    await this.db.timeLogs.bulkPut(timeLogs)
    await this._requestPersistence()
  }

  async update(timeLog: TimeLog): Promise<void> {
    if (timeLog.id === undefined) {
      throw new Error("Only persisted time logs can be updated")
    }

    await this.db.timeLogs.put(timeLog, timeLog.id)
    await this._requestPersistence()
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

  private async _requestPersistence() {
    let isPersisted = false;
    if (navigator.storage && navigator.storage.persist) {
      isPersisted = await navigator.storage.persist();
    }

    if (!isPersisted) {
      throw new Error("Persistence not allowed and time logs can be deleted in the future! Make backups on a regular basis e.g. every day.");
    }
  }
}

export const timeLogRepository = new TimeLogRepository()
