import TimeLog from "../../domain/TimeLog";
import Workday from "../../domain/Workday";
import { groupBy, sum } from "lodash";

export type OvertimeRatioDiagramEntryDto = {
  name: string;
  count: number;
};

export default class OvertimeRatioDiagramDataFactory {
  constructor(private readonly timeLogs: TimeLog[]) {}

  createData(): OvertimeRatioDiagramEntryDto[] {
    const doneTimeLogs = this.timeLogs.filter((timeLog) => timeLog.isDone());

    const workdays = Workday.fromTimeLogs(doneTimeLogs);
    const groupedByOvertime = groupBy(
      workdays,
      (workday) => workday.getOvertimeMs() > 0
    );

    const entries: OvertimeRatioDiagramEntryDto[] = [];

    Object.entries(groupedByOvertime).forEach(([groupName, workdays]) => {
      const name = groupName === "true" ? "With overtime" : "Without overtime";

      const diagramEntryDto: OvertimeRatioDiagramEntryDto = {
        name,
        count: workdays.length,
      };

      entries.push(diagramEntryDto);
    });

    return entries;
  }
}
