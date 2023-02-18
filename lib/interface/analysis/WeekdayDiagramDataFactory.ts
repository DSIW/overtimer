import TimeLog from "../../domain/TimeLog";
import Workday, { Weekday } from "../../domain/Workday";
import { groupBy } from "lodash";
import DurationStatistic from "../../domain/analysis/DurationStatistic";

export type WeekdayDiagramEntryDto = {
  weekday: Weekday;
  weekdayShort: string;
  pause: number;
  work: number;
  overtime: number;
};

export default class WeekdayDiagramDataFactory {
  constructor(private readonly timeLogs: TimeLog[]) {}

  createData(): WeekdayDiagramEntryDto[] {
    const doneTimeLogs = this.timeLogs.filter((timeLog) => timeLog.isDone());

    const workdays = Workday.fromTimeLogs(doneTimeLogs);
    const groupedByWeekday = groupBy(workdays, (workday) =>
      workday.getWeekday()
    );

    const result: WeekdayDiagramEntryDto[] = [];

    Object.entries(groupedByWeekday).forEach(([weekday, workdays]) => {
      const pauseMedian = this.workdayMedian(workdays, "getPauseMs");
      const workMedian = this.workdayMedian(
        workdays,
        "getCappedTotalWorkTimeMs"
      );
      const overtimeMedian = this.workdayMedian(workdays, "getOvertimeMs");

      const diagramEntryDto: WeekdayDiagramEntryDto = {
        weekday: weekday as Weekday,
        weekdayShort: this.convertToShortWeekday(weekday as Weekday),
        pause: pauseMedian,
        work: workMedian,
        overtime: overtimeMedian,
      };

      result.push(diagramEntryDto);
    });

    return this.sortByWeekday(result);
  }

  private workdayMedian(workdays: Workday[], key: keyof Workday): number {
    const overtimes = workdays.map((it) => it[key]()) as number[];

    const durationStatistic = new DurationStatistic();
    return durationStatistic.getStatistics(overtimes).median;
  }

  private sortByWeekday(result: WeekdayDiagramEntryDto[]) {
    const sortedWeekdayIndex = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4,
      Saturday: 5,
      Sunday: 6,
    };

    return result.sort((a, b) => {
      return sortedWeekdayIndex[a.weekday] - sortedWeekdayIndex[b.weekday];
    });
  }

  private convertToShortWeekday(weekday: Weekday) {
    return weekday.substring(0, 3).toUpperCase();
  }
}
