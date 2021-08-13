import React from "react";
import TimeLogTable from "./table/TimeLogTable";
import TimeLogSummary from "./stats/TimeLogSummary";
import TimerContainer from "./timer/TimerContainer";
import { SnackbarProvider } from "notistack";
import PersistenceWarning from "./PersistenceWarning";
import useWindowFocus from "use-window-focus";
import { useTimeLogs } from "./hooks/useTimeLogs";

export default function TimerApp() {
  const timeLogs = useTimeLogs();

  useWindowFocus();

  return (
    <>
      <SnackbarProvider maxSnack={1}>
        <TimerContainer timeLogs={timeLogs} />
        <TimeLogSummary timeLogs={timeLogs} />
        <PersistenceWarning timeLogs={timeLogs} />
        <TimeLogTable timeLogs={timeLogs} />
      </SnackbarProvider>
    </>
  );
}
