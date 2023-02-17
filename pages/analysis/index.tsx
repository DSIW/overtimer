import React from "react";
import Page from "../../lib/interface/layout/Page";
import StatisticsRow from "../../lib/interface/stats/StatisticsRow";
import StatisticsCard from "../../lib/interface/stats/StatisticsCard";
import Duration from "../../lib/interface/Duration";
import TimeLogStatistics from "../../lib/domain/TimeLogStatistics";
import WeekdayDiagramDataFactory from "../../lib/domain/analysis/WeekdayDiagramDataFactory";
import { useLiveQuery } from "dexie-react-hooks";
import { timeLogApplicationService } from "../../lib/application/TimeLogApplicationService";
import TimeLog from "../../lib/domain/TimeLog";
import WeekdayDiagram from "../../lib/interface/analysis/WeekdayDiagram";

export default function AnalysisPage() {
  const timeLogs = useLiveQuery(
    () => timeLogApplicationService.getAllTimeLogs(),
    [],
    [] as TimeLog[]
  );

  const timeLogStatistics = new TimeLogStatistics(timeLogs);
  const totalOvertimeMs = timeLogStatistics.getTotalOvertimeMs();
  const days = timeLogStatistics.getDays();

  const timeLogDiagram = new WeekdayDiagramDataFactory(timeLogs);
  const data = timeLogDiagram.createData();

  return (
    <Page>
      <StatisticsRow>
        <StatisticsCard title="TOTAL OVERTIME">
          <Duration milliseconds={totalOvertimeMs} />
        </StatisticsCard>
        <StatisticsCard title="Days">{days}</StatisticsCard>
      </StatisticsRow>
      <StatisticsRow>
        <WeekdayDiagram data={data} />
      </StatisticsRow>
    </Page>
  );
}
