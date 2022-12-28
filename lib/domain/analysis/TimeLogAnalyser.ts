import TimeLog from "../TimeLog";
import { format } from "date-fns";
import Workday from "../Workday";
import { groupBy } from "lodash";
import TimeStatistic from "./TimeStatistic";

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
      const statistics = new TimeStatistic(startTimes).getTimeStatistics();
      result[weekday] = {
        min: format(statistics.min, "HH:mm:SS"),
        median: format(statistics.median, "HH:mm:SS"),
        max: format(statistics.max, "HH:mm:SS")
      };
    });

    return result;
  }
}
