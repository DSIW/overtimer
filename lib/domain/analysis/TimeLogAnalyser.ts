import TimeLog from "../TimeLog";
import { format, isBefore, max, min } from "date-fns";
import Workday from "../Workday";
import { groupBy } from "lodash";

interface TimeStatistics {
  min: string;
  median: string;
  max: string;
}

export default class TimeLogAnalyser {
  constructor(
    private readonly timeLogs: TimeLog[]
  ) {
  }

  getAverageStartTimePerWeekday() {
    const doneTimeLogs = this.timeLogs
      .filter((timeLog) => timeLog.isDone())

    const workdays = Workday.fromTimeLogs(doneTimeLogs);
    const groupedByWeekday = groupBy(workdays, (workday) => workday.getWeekday());

    const result: Record<string, TimeStatistics> = {};

    Object.entries(groupedByWeekday).forEach(([weekday, workdays]) => {
      const startTimes = workdays.map(workday => workday.getStartTime());
      const minStartTime = min(startTimes);
      const medianStartTime = this.median(startTimes);
      const maxStartTime = max(startTimes);
      result[weekday] = {
        min: format(minStartTime, "HH:mm:SS"),
        median: format(medianStartTime, "HH:mm:SS"),
        max: format(maxStartTime, "HH:mm:SS")
      };
    });

    return result;
  }

  private median(times: Date[]) {
    const sorted = times.sort((a, b) => isBefore(a, b) ? -1 : 1);
    const middleIndex = Math.floor(times.length / 2);
    return sorted[middleIndex];
  }
}
