import TimeLog from "../TimeLog";
import Workday, { Weekday } from "../Workday";
import { groupBy } from "lodash";
import DurationStatistic from "./DurationStatistic";

type DiagramEntryDto = {
  weekday: Weekday;
  weekdayShort: string;
  pause: number;
  work: number;
  overtime: number;
};

export type DiagramEntriesDto = DiagramEntryDto[];

export default class WeekdayDiagramDataFactory {
  constructor(private readonly timeLogs: TimeLog[]) {}

  createData(): DiagramEntriesDto {
    const doneTimeLogs = this.timeLogs.filter((timeLog) => timeLog.isDone());

    const workdays = Workday.fromTimeLogs(doneTimeLogs);
    const groupedByWeekday = groupBy(workdays, (workday) =>
      workday.getWeekday()
    );

    const result: DiagramEntriesDto = [];

    Object.entries(groupedByWeekday).forEach(([weekday, workdays]) => {
      const pauseMedian = this.workdayMedian(workdays, "getPauseMs");
      const workMedian = this.workdayMedian(
        workdays,
        "getCappedTotalWorkTimeMs"
      );
      const overtimeMedian = this.workdayMedian(workdays, "getOvertimeMs");

      const diagramEntryDto: DiagramEntryDto = {
        weekday: weekday as Weekday,
        weekdayShort: this.convertToShortWeekday(weekday as Weekday),
        pause: pauseMedian,
        work: workMedian,
        overtime: overtimeMedian,
      };

      result.push(diagramEntryDto);
    });

    const sorted = this.sortByWeekday(result);

    return sorted;
  }

  private workdayMedian(workdays: Workday[], key: keyof Workday): number {
    const overtimes = workdays.map((it) => it[key]()) as number[];

    const durationStatistic = new DurationStatistic();
    return durationStatistic.getStatistics(overtimes).median;
  }

  private sortByWeekday(result: DiagramEntryDto[]) {
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
