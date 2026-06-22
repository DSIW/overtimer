import React from "react";
import TimeLogTable from "./table/TimeLogTable";
import TimeLogSummary from "./stats/TimeLogSummary";
import TimerContainer from "./timer/TimerContainer";
import { SnackbarProvider } from "notistack";
import PersistenceWarning from "./PersistenceWarning";
import { useTimeLogs } from "./hooks/useTimeLogs";
import { useWeekLimit } from "./hooks/useWeekLimit";
import Footer from "./footer/Footer";

export default function TimerApp() {
  const [weekLimit, setWeekLimit] = useWeekLimit();
  const timeLogs = useTimeLogs(weekLimit);

  return (
    <>
      <SnackbarProvider maxSnack={1}>
        <TimerContainer timeLogs={timeLogs} />
        <TimeLogSummary timeLogs={timeLogs} />
        <PersistenceWarning timeLogs={timeLogs} />
        <TimeLogTable
          timeLogs={timeLogs}
          weekLimit={weekLimit}
          onWeekLimitChange={setWeekLimit}
        />
        <Footer />
      </SnackbarProvider>
    </>
  );
}
