import React, { Fragment } from "react";
import WeekdayDiagramDataFactory from "./WeekdayDiagramDataFactory";
import TimeLog from "../../domain/TimeLog";
import OvertimeDiagramDataFactory from "./OvertimeDiagramDataFactory";
import StatisticsCard from "../stats/StatisticsCard";
import DiagramContainer from "./DiagramContainer";
import TimeLogStatistics from "../../domain/TimeLogStatistics";
import OvertimeDiagram from "./OvertimeDiagram";
import Duration from "../Duration";
import StatisticsRow from "../stats/StatisticsRow";
import WeekdayDiagram from "./WeekdayDiagram";
import DiagramRow from "./DiagramRow";

interface Props {
  timeLogs: TimeLog[];
}

export default function Analysis({ timeLogs }: Props) {
  const timeLogStatistics = new TimeLogStatistics(timeLogs);
  const totalOvertimeMs = timeLogStatistics.getTotalOvertimeMs();
  const days = timeLogStatistics.getDays();

  const weekdayData = new WeekdayDiagramDataFactory(timeLogs).createData();
  const overtimeData = new OvertimeDiagramDataFactory(timeLogs).createData();

  return (
    <Fragment>
      <StatisticsRow>
        <StatisticsCard title="total overtime">
          <Duration milliseconds={totalOvertimeMs} />
        </StatisticsCard>
        <StatisticsCard title="days">{days}</StatisticsCard>
      </StatisticsRow>
      <DiagramRow>
        <h3>Weekday</h3>
        <DiagramContainer>
          <WeekdayDiagram data={weekdayData} />
        </DiagramContainer>
      </DiagramRow>
      <DiagramRow>
        <h3>History</h3>
        <DiagramContainer>
          <OvertimeDiagram data={overtimeData} />
        </DiagramContainer>
      </DiagramRow>
    </Fragment>
  );
}
