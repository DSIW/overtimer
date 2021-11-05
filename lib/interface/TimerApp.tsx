import React from "react";
import TimeLogTable from "./table/TimeLogTable";
import TimeLogSummary from "./stats/TimeLogSummary";
import TimerContainer from "./timer/TimerContainer";
import { SnackbarProvider } from "notistack";
import PersistenceWarning from "./PersistenceWarning";
import { useTimeLogs } from "./hooks/useTimeLogs";
import Footer from "./footer/Footer";

const WEEK_LIMIT = 8;

export default function TimerApp() {
  const timeLogs = useTimeLogs(WEEK_LIMIT);

  return (
    <>
      <SnackbarProvider maxSnack={1}>
        <TimerContainer timeLogs={timeLogs} />
        <TimeLogSummary timeLogs={timeLogs} />
        <PersistenceWarning timeLogs={timeLogs} />
        <TimeLogTable timeLogs={timeLogs} weekLimit={WEEK_LIMIT} />
        <Footer />
      </SnackbarProvider>
    </>
  );
}
