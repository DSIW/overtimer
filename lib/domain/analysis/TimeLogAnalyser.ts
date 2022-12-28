import TimeLog from "../TimeLog";
import Workday from "../Workday";
import { groupBy } from "lodash";
import TimeStatistic from "./TimeStatistic";
import DurationStatistic from "./DurationStatistic";
import { Statistics } from "./Statistic";

export default class TimeLogAnalyser {
  constructor(private readonly timeLogs: TimeLog[]) {}

  getStartTimeStatisticsPerWeekday() {
    return this.getTimeStatisticsPerWeekday(
      "getStartTime",
      new TimeStatistic()
    );
  }

  getEndTimeStatisticsPerWeekday() {
    return this.getTimeStatisticsPerWeekday("getEndTime", new TimeStatistic());
  }

  getPauseStatisticsPerWeekday() {
    return this.getTimeStatisticsPerWeekday(
      "getPauseMs",
      new DurationStatistic()
    );
  }

  getTimeStatisticsPerWeekday(
    type: "getStartTime" | "getEndTime" | "getPauseMs",
    statisticMethod: TimeStatistic | DurationStatistic
  ) {
    const doneTimeLogs = this.timeLogs.filter((timeLog) => timeLog.isDone());

    const workdays = Workday.fromTimeLogs(doneTimeLogs);
    const groupedByWeekday = groupBy(workdays, (workday) =>
      workday.getWeekday()
    );

    const result: Record<string, Statistics> = {};

    Object.entries(groupedByWeekday).forEach(([weekday, workdays]) => {
      const values = workdays.map((workday) => workday[type]());
      // @ts-ignore
      const statistics = statisticMethod.getStatistics(values);
      result[weekday] = statistics;
    });

    return result;
  }
}
