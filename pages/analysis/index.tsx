import React from "react";
import Page from "../Page";
import StatisticsRow from "../../lib/interface/stats/StatisticsRow";
import StatisticsCard from "../../lib/interface/stats/StatisticsCard";
import Duration from "../../lib/interface/Duration";
import TimeLogAnalyser from "../../lib/domain/analysis/TimeLogAnalyser";
import { useTimeLogs } from "../../lib/interface/hooks/useTimeLogs";
import TimeLogStatistics from "../../lib/domain/TimeLogStatistics";

export default function AnalysisPage() {
  const timeLogs = useTimeLogs();

  const timeLogStatistics = new TimeLogStatistics(timeLogs);
  const totalOvertimeMs = timeLogStatistics.getTotalOvertimeMs();
  const days = timeLogStatistics.getDays();

  const analyser = new TimeLogAnalyser(timeLogs);
  const startTimes = analyser.getStartTimeStatisticsPerWeekday();
  const pause = analyser.getPauseStatisticsPerWeekday();
  const endTimes = analyser.getEndTimeStatisticsPerWeekday();

  return (
    <Page>
      <StatisticsRow>
        <StatisticsCard title="TOTAL OVERTIME">
          <Duration milliseconds={totalOvertimeMs} />
        </StatisticsCard>
        <StatisticsCard title="Days">
          {days}
        </StatisticsCard>
      </StatisticsRow>
      <StatisticsRow>
        <StatisticsCard title="Start time">
          {JSON.stringify(startTimes)}
        </StatisticsCard>
        <StatisticsCard title="Pause time">
          {JSON.stringify(pause)}
        </StatisticsCard>
        <StatisticsCard title="End time">
          {JSON.stringify(endTimes)}
        </StatisticsCard>
      </StatisticsRow>
    </Page>
  );
}
