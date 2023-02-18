import React from "react";
import Page from "../../lib/interface/layout/Page";
import StatisticsRow from "../../lib/interface/stats/StatisticsRow";
import StatisticsCard from "../../lib/interface/stats/StatisticsCard";
import Duration from "../../lib/interface/Duration";
import TimeLogStatistics from "../../lib/domain/TimeLogStatistics";
import WeekdayDiagramDataFactory from "../../lib/interface/analysis/WeekdayDiagramDataFactory";
import { useLiveQuery } from "dexie-react-hooks";
import { timeLogApplicationService } from "../../lib/application/TimeLogApplicationService";
import TimeLog from "../../lib/domain/TimeLog";
import WeekdayDiagram from "../../lib/interface/analysis/WeekdayDiagram";
import OvertimeDiagram from "../../lib/interface/analysis/OvertimeDiagram";
import OvertimeDiagramDataFactory from "../../lib/interface/analysis/OvertimeDiagramDataFactory";
import DiagramRow from "../../lib/interface/analysis/DiagramRow";

export default function AnalysisPage() {
  const timeLogs = useLiveQuery(
    () => timeLogApplicationService.getAllTimeLogs(),
    [],
    [] as TimeLog[]
  );

  const timeLogStatistics = new TimeLogStatistics(timeLogs);
  const totalOvertimeMs = timeLogStatistics.getTotalOvertimeMs();
  const days = timeLogStatistics.getDays();

  const weekdayData = new WeekdayDiagramDataFactory(timeLogs).createData();
  const overtimeData = new OvertimeDiagramDataFactory(timeLogs).createData();

  return (
    <Page>
      <StatisticsRow>
        <StatisticsCard title="total overtime">
          <Duration milliseconds={totalOvertimeMs} />
        </StatisticsCard>
        <StatisticsCard title="days">{days}</StatisticsCard>
      </StatisticsRow>
      <DiagramRow>
        <h3>Weekday</h3>
        <WeekdayDiagram data={weekdayData} />
      </DiagramRow>
      <DiagramRow>
        <h3>History</h3>
        <OvertimeDiagram data={overtimeData} />
      </DiagramRow>
    </Page>
  );
}
