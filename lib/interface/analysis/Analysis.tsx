import React, { Fragment } from "react";
import WeekdayDiagramDataFactory from "./weekday/WeekdayDiagramDataFactory";
import TimeLog from "../../domain/TimeLog";
import OvertimeDiagramDataFactory from "./history/OvertimeDiagramDataFactory";
import StatisticsCard from "../stats/StatisticsCard";
import TimeLogStatistics from "../../domain/TimeLogStatistics";
import OvertimeDiagram from "./history/OvertimeDiagram";
import Duration from "../Duration";
import StatisticsRow from "../stats/StatisticsRow";
import WeekdayDiagram from "./weekday/WeekdayDiagram";
import DiagramCard from "./DiagramCard";
import OvertimeRatioDiagram from "./days/OvertimeRatioDiagram";
import OvertimeRatioDiagramDataFactory from "./days/OvertimeRatioDiagramDataFactory";
import { Grid } from "@mui/material";

interface Props {
  timeLogs: TimeLog[];
}

export default function Analysis({ timeLogs }: Props) {
  const doneTimeLogs = timeLogs.filter((timeLog) => timeLog.isDone());

  const timeLogStatistics = new TimeLogStatistics(doneTimeLogs);

  const totalOvertimeMs = timeLogStatistics.getTotalOvertimeMs();
  const days = timeLogStatistics.getDays();

  const weekdayData = new WeekdayDiagramDataFactory(doneTimeLogs).createData();
  const overtimeData = new OvertimeDiagramDataFactory(
    doneTimeLogs
  ).createData();
  const ratioData = new OvertimeRatioDiagramDataFactory(
    doneTimeLogs
  ).createData();

  return (
    <Fragment>
      <StatisticsRow>
        <StatisticsCard title="total overtime">
          <Duration milliseconds={totalOvertimeMs} />
        </StatisticsCard>
        <StatisticsCard title="days">{days}</StatisticsCard>
      </StatisticsRow>
      <Grid container gap={2}>
        <DiagramCard title="Days">
          <OvertimeRatioDiagram data={ratioData} />
        </DiagramCard>
        <DiagramCard title="Weekday">
          <WeekdayDiagram data={weekdayData} />
        </DiagramCard>
        <DiagramCard title="History">
          <OvertimeDiagram data={overtimeData} />
        </DiagramCard>
      </Grid>
    </Fragment>
  );
}
