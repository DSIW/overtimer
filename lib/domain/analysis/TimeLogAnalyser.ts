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

  getStartTimeStatisticsPerWeekday() {
    const doneTimeLogs = this.timeLogs
      .filter((timeLog) => timeLog.isDone())

    const workdays = Workday.fromTimeLogs(doneTimeLogs);
    const groupedByWeekday = groupBy(workdays, (workday) => workday.getWeekday());

    const result: Record<string, TimeStatistics> = {};

    Object.entries(groupedByWeekday).forEach(([weekday, workdays]) => {
      const startTimes = workdays.map(workday => workday.getStartTime());
      const statistics = this.getTimeStatistics(startTimes);
      result[weekday] = {
        min: format(statistics.min, "HH:mm:SS"),
        median: format(statistics.median, "HH:mm:SS"),
        max: format(statistics.max, "HH:mm:SS")
      };
    });

    return result;
  }

  private getTimeStatistics(times: Date[]) {
    const minStartTime = min(times);
    const medianStartTime = this.median(times);
    const maxStartTime = max(times);
    return {
      min: minStartTime,
      median: medianStartTime,
      max: maxStartTime,
    };
  }

  private median(times: Date[]) {
    const sorted = times.sort((a, b) => isBefore(a, b) ? -1 : 1);
    const middleIndex = Math.floor(times.length / 2);
    return sorted[middleIndex];
  }
}
