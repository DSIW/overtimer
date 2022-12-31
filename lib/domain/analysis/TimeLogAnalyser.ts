import TimeLog from "../TimeLog";
import Workday from "../Workday";
import { groupBy } from "lodash";
import TimeStatistic from "./TimeStatistic";
import DurationStatistic from "./DurationStatistic";
import { Statistics } from "./Statistic";

export default class TimeLogAnalyser {
  private timeStatistic = new TimeStatistic();
  private durationStatistic = new DurationStatistic();

  constructor(private readonly timeLogs: TimeLog[]) {}

  getStartTimeStatisticsPerWeekday() {
    return this.getTimeStatisticsPerWeekday((workdays) => {
      return this.timeStatistic.getStatistics(
        workdays.map((workday) => workday.getStartTime())
      );
    });
  }

  getEndTimeStatisticsPerWeekday() {
    return this.getTimeStatisticsPerWeekday((workdays) => {
      return this.timeStatistic.getStatistics(
        workdays.map((workday) => workday.getEndTime())
      );
    });
  }

  getPauseStatisticsPerWeekday() {
    return this.getTimeStatisticsPerWeekday((workdays) => {
      return this.durationStatistic.getStatistics(
        workdays.map((workday) => workday.getPauseMs())
      );
    });
  }

  private getTimeStatisticsPerWeekday(
    callback: (workdays: Workday[]) => Statistics
  ) {
    const doneTimeLogs = this.timeLogs.filter((timeLog) => timeLog.isDone());

    const workdays = Workday.fromTimeLogs(doneTimeLogs);
    const groupedByWeekday = groupBy(workdays, (workday) =>
      workday.getWeekday()
    );

    const result: Record<string, Statistics> = {};

    Object.entries(groupedByWeekday).forEach(([weekday, workdays]) => {
      result[weekday] = callback(workdays);
    });

    return result;
  }
}
