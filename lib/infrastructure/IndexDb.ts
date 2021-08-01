import Dexie from "dexie";
import TimeLog from "../domain/TimeLog";

export default class IndexDb extends Dexie {
  timeLogs: Dexie.Table<TimeLog, number>;

  constructor() {
    super("OvertimerDatabase");
    this.version(1).stores({
      timeLogs: "&startTime,endTime",
    });

    const SCHEMA_VERSION_2 = "++id,&startTime";

    // move data to migration table
    this.version(2)
      .stores({
        timeLogsWithId: SCHEMA_VERSION_2,
      })
      .upgrade(async (tx) => {
        const timeLogs = await tx.table("timeLogs").toArray();
        await tx.table("timeLogsWithId").bulkAdd(timeLogs);
      });

    // remove old table
    this.version(3).stores({
      timeLogs: null,
    });

    // move data back to timeLogs
    this.version(4)
      .stores({
        timeLogs: SCHEMA_VERSION_2,
      })
      .upgrade(async (tx) => {
        const timeLogs = await tx.table("timeLogsWithId").toArray();
        await tx.table("timeLogs").bulkAdd(timeLogs);
      });

    // remove migration table
    this.version(5).stores({
      timeLogsWithId: null,
    });

    this.timeLogs = this.table("timeLogs");
  }
}
