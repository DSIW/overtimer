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

  const showWeekly = weeklyOvertimeMs > 0 && totalOvertimeMs > 0;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        margin: "2rem",
        width: "100%",
      }}
    >
      {showWeekly && (
        <StatisticsCard title="WEEKLY OVERTIME">
          <Duration milliseconds={weeklyOvertimeMs} />
        </StatisticsCard>
      )}
      <StatisticsCard title="TOTAL OVERTIME">
        <Duration milliseconds={totalOvertimeMs} />
      </StatisticsCard>
    </div>
  );
}
