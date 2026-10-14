import React from "react";
import TimeLogTable from "./table/TimeLogTable";
import TimeLogSummary from "./stats/TimeLogSummary";
import TimerContainer from "./timer/TimerContainer";
import { SnackbarProvider } from "notistack";
import PersistenceWarning from "./PersistenceWarning";
import { useTimeLogs } from "./hooks/useTimeLogs";
import { useTimeRangeOption } from "./hooks/useTimeRangeOption";
import Footer from "./footer/Footer";

export default function TimerApp() {
  const [timeRangeOptionId, setTimeRangeOptionId] = useTimeRangeOption();
  const timeLogs = useTimeLogs(timeRangeOptionId);

  return (
    <>
      <SnackbarProvider maxSnack={1}>
        <TimerContainer timeLogs={timeLogs} />
        <TimeLogSummary timeLogs={timeLogs} />
        <PersistenceWarning timeLogs={timeLogs} />
        <TimeLogTable
          timeLogs={timeLogs}
          timeRangeOptionId={timeRangeOptionId}
          onTimeRangeOptionChange={setTimeRangeOptionId}
        />
        <Footer />
      </SnackbarProvider>
    </>
  );
}
