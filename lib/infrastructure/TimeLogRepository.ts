import TimeLog from "../domain/TimeLog";
import IndexDb from "./IndexDb";
import { requestPersistence } from "./PersistencePermission";
import { isAfter } from "date-fns";

export default class TimeLogRepository {
  private db: IndexDb;

  constructor() {
    this.db = new IndexDb();
    this.db.timeLogs.mapToClass(TimeLog);
  }

  async all(): Promise<TimeLog[]> {
    const records = await this.db.timeLogs
      .orderBy("startTime")
      .reverse()
      .toArray();
    return records.map((record) => new TimeLog({ ...record }));
  }

  async count(): Promise<number> {
    return await this.db.timeLogs.count();
  }

  async allBefore(limitDate: Date): Promise<TimeLog[]> {
    const records = await this.db.timeLogs
      .orderBy("startTime")
      .filter((timeLog) => isAfter(timeLog.startTime, limitDate))
      .reverse()
      .toArray();
    return records.map((record) => new TimeLog({ ...record }));
  }

  async save(timeLog: TimeLog): Promise<void> {
    await this.db.timeLogs.put(timeLog);
    await requestPersistence();
  }

  async replaceAll(timeLogs: TimeLog[]): Promise<void> {
    await this.db.transaction("rw", this.db.timeLogs, async () => {
      await this.db.timeLogs.clear();
      await this.db.timeLogs.bulkAdd(timeLogs);
    });
    await requestPersistence();
  }

  async update(timeLog: TimeLog): Promise<void> {
    if (timeLog.id === undefined) {
      throw new Error("Only persisted time logs can be updated");
    }

    await this.db.timeLogs.put(timeLog, timeLog.id);
    await requestPersistence();
  }

  async delete(timeLog: TimeLog): Promise<void> {
    if (timeLog.id === undefined) {
      throw new Error("Only persisted time logs can be deleted");
    }

    await this.db.timeLogs.delete(timeLog.id);
  }
}

export const timeLogRepository = new TimeLogRepository();
