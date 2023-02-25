import React, { useEffect } from "react";
import TimeLogTable from "./table/TimeLogTable";
import TimeLogSummary from "./stats/TimeLogSummary";
import TimerContainer from "./timer/TimerContainer";
import { SnackbarProvider } from "notistack";
import PersistenceWarning from "./PersistenceWarning";
import { useTimeLogs } from "./hooks/useTimeLogs";
import Footer from "./footer/Footer";

export default function TimerApp() {
  const timeLogs = useTimeLogs();

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  async function showNotification(text: string) {
    if (Notification.permission == "granted") {
      const reg = await navigator.serviceWorker.getRegistration();
      reg && reg.showNotification(text);
    }
  }

  return (
    <>
      <SnackbarProvider maxSnack={1}>
        <TimerContainer timeLogs={timeLogs} />
        <button onClick={() => showNotification("test")}>
          Show notification
        </button>
        <TimeLogSummary timeLogs={timeLogs} />
        <PersistenceWarning timeLogs={timeLogs} />
        <TimeLogTable timeLogs={timeLogs} />
        <Footer />
      </SnackbarProvider>
    </>
  );
}
