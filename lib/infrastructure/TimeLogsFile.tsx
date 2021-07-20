import { formatISO, parseISO } from "date-fns";
import TimeLog from "../domain/TimeLog";

interface Writable {
  write: (content: string) => void;
  close: () => void;
}

interface GetFile {
  text: () => Promise<string>;
}

interface FileHandle {
  createWritable: () => Promise<Writable>;
  getFile: () => Promise<GetFile>;
}

interface TimeLogRecord {
  startTime: string;
  endTime: string | undefined;
}

export default class TimeLogsFile {
  async write(fileHandle: FileHandle, timeLogs: TimeLog[]) {
    try {
      const writable = await fileHandle.createWritable();
      const timeLogRecords = timeLogs.map(timeLog => ({
        startTime: formatISO(timeLog.startTime),
        endTime: timeLog.endTime && formatISO(timeLog.endTime),
      }))
      await writable.write(JSON.stringify(timeLogRecords, null, 2));
      await writable.close();
    } catch(error) {
      console.error(error)
    }
  }

  async read(fileHandle: FileHandle): Promise<TimeLog[]> {
    const file = await fileHandle.getFile();
    const content = await file.text();
    const json = JSON.parse(content) as TimeLogRecord[];
    return json.map((record) => new TimeLog({
      startTime: parseISO(record.startTime),
      endTime: record.endTime !== undefined ? parseISO(record.endTime) : undefined,
    }))
  }
}
