import TimeLog from "../TimeLog";
import { format } from "date-fns";
import Workday from "../Workday";
import { groupBy } from "lodash";
import TimeStatistic from "./TimeStatistic";

interface FormattedTimeStatistics {
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

    const result: Record<string, FormattedTimeStatistics> = {};

    Object.entries(groupedByWeekday).forEach(([weekday, workdays]) => {
      const startTimes = workdays.map(workday => workday.getStartTime());
      const statistics = new TimeStatistic(startTimes).getTimeStatistics();
      result[weekday] = {
        min: this.formatTime(statistics.min),
        median: this.formatTime(statistics.median),
        max: this.formatTime(statistics.max)
      };
    });

    return result;
  }

  private formatTime(date: Date) {
    return format(date, "HH:mm:SS")
  }
}
