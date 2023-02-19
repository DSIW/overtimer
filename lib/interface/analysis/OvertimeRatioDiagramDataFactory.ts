import TimeLog from "../../domain/TimeLog";
import Workday from "../../domain/Workday";

export type OvertimeRatioDiagramEntryDto = {
  name: string;
  count: number;
};

export default class OvertimeRatioDiagramDataFactory {
  constructor(private readonly timeLogs: TimeLog[]) {}

  createData(): OvertimeRatioDiagramEntryDto[] {
    const doneTimeLogs = this.timeLogs.filter((timeLog) => timeLog.isDone());

    const workdays = Workday.fromTimeLogs(doneTimeLogs);

    let daysWithOvertime = 0;
    let daysWithoutOvertime = 0;
    workdays.forEach((workday) => {
      if (workday.hasOvertime()) {
        daysWithOvertime = daysWithOvertime + 1;
      } else {
        daysWithoutOvertime = daysWithoutOvertime + 1;
      }
    });

    return [
      {
        name: "With overtime",
        count: daysWithOvertime,
      },
      {
        name: "Without overtime",
        count: daysWithoutOvertime,
      },
    ];
  }
}
