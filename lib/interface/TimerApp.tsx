import React from "react";
import TimeLog from "../domain/TimeLog";
import TimeLogTable from "./table/TimeLogTable";
import TimeLogSummary from "./TimeLogSummary";
import { Action } from "./table/TableRowActionButton";
import TimerContainer from "./timer/TimerContainer";
import { timerApplicationService } from "../application/TimerApplicationService";
import { SnackbarProvider } from "notistack";
import PersistenceWarning from "./PersistenceWarning";
import BackupReminder from "./BackupReminder";
import { useTimeLogs } from "./useTimeLogs";
import PersistenceWarning from "./PersistenceWarning";

export default function TimerApp() {
  const timeLogs = useTimeLogs();

  async function handleAction(action: Action, timeLog: TimeLog) {
    switch (action) {
      case "delete":
        await timerApplicationService.delete(timeLog);
        return;
      case "edit":
        await timerApplicationService.update(timeLog);
        return;
    }
  }

  return (
    <>
      <SnackbarProvider maxSnack={1}>
        <BackupReminder timeLogs={timeLogs} />
        <TimerContainer timeLogs={timeLogs} />
        <TimeLogSummary timeLogs={timeLogs} />
        <PersistenceWarning timeLogs={timeLogs} />
        <TimeLogTable timeLogs={timeLogs} onAction={handleAction} />
      </SnackbarProvider>
    </>
  );
}
