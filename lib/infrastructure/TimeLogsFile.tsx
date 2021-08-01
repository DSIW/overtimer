import { saveAs } from "file-saver";
import { formatISO, parseISO } from "date-fns";
import TimeLog from "../domain/TimeLog";

interface TimeLogRecord {
  startTime: string;
  endTime: string | undefined;
}

export default class TimeLogsFile {
  async write(fileName: string, timeLogs: TimeLog[]) {
    const timeLogRecords = timeLogs.map((timeLog) => ({
      startTime: formatISO(timeLog.startTime),
      endTime: timeLog.endTime && formatISO(timeLog.endTime),
    }));
    const timeLogJson = JSON.stringify(timeLogRecords, null, 2);

    var blob = new Blob([timeLogJson], {
      type: "application/json;charset=utf-8",
    });
    saveAs(blob, fileName);
  }

  async read(file: File): Promise<TimeLog[]> {
    const content = await file.text();
    const json = JSON.parse(content) as TimeLogRecord[];
    return json.map(
      (record) =>
        new TimeLog({
          startTime: parseISO(record.startTime),
          endTime:
            record.endTime !== undefined ? parseISO(record.endTime) : undefined,
        })
    );
  }
}
