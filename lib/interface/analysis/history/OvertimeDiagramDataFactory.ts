import TimeLog from "../../../domain/TimeLog";
import Workday from "../../../domain/Workday";
import _, { groupBy, sum } from "lodash";
import { compareAsc } from "date-fns";

export type OvertimeDiagramEntryDto = {
  date: Date;
  name: string;
  tooltipName: string;
  overtime: number;
  cumulated: number;
};

export default class OvertimeDiagramDataFactory {
  constructor(private readonly timeLogs: TimeLog[]) {}

  createData(): OvertimeDiagramEntryDto[] {
    const workdays = Workday.fromTimeLogs(this.timeLogs);

    const allSameYear =
      _.uniq(workdays.map((it) => it.format("yyyy"))).length === 1;

    const groupedByWeek = groupBy(workdays, (workday) =>
      workday.format(allSameYear ? "ww" : "MM/yyyy")
    );

    const entries: OvertimeDiagramEntryDto[] = [];

    Object.entries(groupedByWeek).forEach(([_week, workdays]) => {
      const overtimes = workdays.map((it) => it.getOverAndUndertimeMs());
      const overtimeSum = sum(overtimes);

      const workday = workdays[0];
      const name = workday.format(allSameYear ? "ww" : "MMM yyyy");

      const diagramEntryDto: OvertimeDiagramEntryDto = {
        date: workday.getStartTime(),
        name,
        tooltipName: allSameYear ? `CW ${name}` : name,
        overtime: overtimeSum,
        cumulated: 0,
      };

      entries.push(diagramEntryDto);
    });

    const sorted = this.sortByTime(entries);

    return this.cumulate(sorted);
  }

  private cumulate(
    entries: OvertimeDiagramEntryDto[]
  ): OvertimeDiagramEntryDto[] {
    let overtimeCum = 0;
    return entries.map((entry) => {
      overtimeCum = overtimeCum + entry.overtime;
      return {
        ...entry,
        cumulated: overtimeCum,
      };
    });
  }

  private sortByTime(entries: OvertimeDiagramEntryDto[]) {
    return entries.sort((a, b) => {
      return compareAsc(a.date, b.date);
    });
  }
}
