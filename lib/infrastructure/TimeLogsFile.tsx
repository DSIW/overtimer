import { saveAs } from "file-saver";
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
  async write(fileName: string, timeLogs: TimeLog[]) {
    const timeLogRecords = timeLogs.map(timeLog => ({
      startTime: formatISO(timeLog.startTime),
      endTime: timeLog.endTime && formatISO(timeLog.endTime),
    }))
    const timeLogJson = JSON.stringify(timeLogRecords, null, 2)

    try {
      var blob = new Blob([timeLogJson], { type: "application/json;charset=utf-8" });
      saveAs(blob, fileName);
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
