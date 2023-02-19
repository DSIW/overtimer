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
import OvertimeRatioDiagram from "./OvertimeRatioDiagram";
import OvertimeRatioDiagramDataFactory from "./OvertimeRatioDiagramDataFactory";
import { Grid } from "@mui/material";

interface Props {
  timeLogs: TimeLog[];
}

export default function Analysis({ timeLogs }: Props) {
  const timeLogStatistics = new TimeLogStatistics(timeLogs);
  const totalOvertimeMs = timeLogStatistics.getTotalOvertimeMs();
  const days = timeLogStatistics.getDays();

  const weekdayData = new WeekdayDiagramDataFactory(timeLogs).createData();
  const overtimeData = new OvertimeDiagramDataFactory(timeLogs).createData();
  const ratioData = new OvertimeRatioDiagramDataFactory(timeLogs).createData();

  return (
    <Fragment>
      <StatisticsRow>
        <StatisticsCard title="total overtime">
          <Duration milliseconds={totalOvertimeMs} />
        </StatisticsCard>
        <StatisticsCard title="days">{days}</StatisticsCard>
      </StatisticsRow>
      <Grid container gap={2}>
        <Grid xs={12}>
          <DiagramRow title="Days">
            <DiagramContainer>
              <OvertimeRatioDiagram data={ratioData} />
            </DiagramContainer>
          </DiagramRow>
        </Grid>
        <Grid xs={12}>
          <DiagramRow title="Weekday">
            <DiagramContainer>
              <WeekdayDiagram data={weekdayData} />
            </DiagramContainer>
          </DiagramRow>
        </Grid>
        <Grid xs={12}>
          <DiagramRow title="History">
            <DiagramContainer>
              <OvertimeDiagram data={overtimeData} />
            </DiagramContainer>
          </DiagramRow>
        </Grid>
      </Grid>
    </Fragment>
  );
}
