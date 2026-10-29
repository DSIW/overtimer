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

    const blob = new Blob([timeLogJson], {
      type: "application/json;charset=utf-8",
    });
    saveAs(blob, fileName);
  }

  async read(file: File): Promise<TimeLog[]> {
    const content = await file.text();
    const json = JSON.parse(content) as TimeLogRecord[];
    const timeLogs = json.map((record) => {
      const timeLog = new TimeLog({
        startTime: parseISO(record.startTime),
        endTime:
          record.endTime !== undefined ? parseISO(record.endTime) : undefined,
      });
      if (!timeLog.isValid()) {
        throw new Error(
          `Timelog [${timeLog.startTime}, ${timeLog.endTime}] is invalid!`
        );
      }
      return timeLog;
    });

    const startTimes = new Set<number>();
    for (const timeLog of timeLogs) {
      const startTime = timeLog.startTime.getTime();
      if (startTimes.has(startTime)) {
        throw new Error(
          `Timelog starting at ${timeLog.startTime} appears more than once!`
        );
      }
      startTimes.add(startTime);
    }

    return timeLogs;
  }
}
