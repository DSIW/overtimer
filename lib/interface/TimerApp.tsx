import React, { useState } from "react";
import TimeLogTable from "./table/TimeLogTable";
import TimeLogSummary from "./stats/TimeLogSummary";
import TimerContainer from "./timer/TimerContainer";
import { SnackbarProvider } from "notistack";
import PersistenceWarning from "./PersistenceWarning";
import { useTimeLogs } from "./hooks/useTimeLogs";
import Footer from "./footer/Footer";
import WeekLimitSetting from "./WeekLimitSetting";

const DEFAULT_WEEK_LIMIT = 8;

export default function TimerApp() {
  const [weekLimit, setWeekLimit] = useState(DEFAULT_WEEK_LIMIT);

  const timeLogs = useTimeLogs(weekLimit);

  return (
    <>
      <SnackbarProvider maxSnack={1}>
        <TimerContainer timeLogs={timeLogs} />
        <TimeLogSummary timeLogs={timeLogs} />
        <PersistenceWarning timeLogs={timeLogs} />
        <TimeLogTable timeLogs={timeLogs} weekLimit={weekLimit} />
        <WeekLimitSetting
          weekLimit={weekLimit}
          onChange={setWeekLimit}
          enabledWeekLimit={DEFAULT_WEEK_LIMIT}
        />
        <Footer />
      </SnackbarProvider>
    </>
  );
}
