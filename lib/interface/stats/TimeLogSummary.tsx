import React from "react";
import TimeLog from "../../domain/TimeLog";
import Duration from "../Duration";
import TimeLogStatistics from "../../domain/TimeLogStatistics";
import StatisticsCard from "./StatisticsCard";

interface Props {
  timeLogs: TimeLog[];
}

export default function TimeLogSummary({ timeLogs }: Props) {
  const weeklyOvertimeMs = new TimeLogStatistics(
    timeLogs
  ).getWeeklyOvertimeMs();
  const totalOvertimeMs = new TimeLogStatistics(timeLogs).getTotalOvertimeMs();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        margin: "2rem",
        width: "100%",
      }}
    >
      <StatisticsCard title="WEEKLY OVERVIEW">
        <Duration milliseconds={weeklyOvertimeMs} />
      </StatisticsCard>
      <StatisticsCard title="TOTAL OVERVIEW">
        <Duration milliseconds={totalOvertimeMs} />
      </StatisticsCard>
    </div>
  );
}
