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

  async updateLast(timeLog: TimeLog): Promise<void> {
    await this.db.timeLogs.put(timeLog)
  }
}

export const timeLogRepository = new TimeLogRepository()
