import React, { useEffect } from "react";
import TimeLogTable from "./table/TimeLogTable";
import TimeLogSummary from "./stats/TimeLogSummary";
import TimerContainer from "./timer/TimerContainer";
import { SnackbarProvider } from "notistack";
import PersistenceWarning from "./PersistenceWarning";
import { useTimeLogs } from "./hooks/useTimeLogs";
import Footer from "./footer/Footer";
import { Button } from "@mui/material";

export default function TimerApp() {
  const timeLogs = useTimeLogs();

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  async function showNotification(text: string) {
    if (Notification.permission == "granted") {
      const reg = await navigator.serviceWorker.getRegistration();
      reg &&
        reg.showNotification(text, {
          actions: [
            {
              action: "action",
              title: "title",
            },
          ],
          vibrate: [200, 100, 200],
        });
    }
  }

  return (
    <>
      <SnackbarProvider maxSnack={1}>
        <TimerContainer timeLogs={timeLogs} />
        <Button onClick={() => showNotification("test")}>
          Show notification
        </Button>
        <TimeLogSummary timeLogs={timeLogs} />
        <PersistenceWarning timeLogs={timeLogs} />
        <TimeLogTable timeLogs={timeLogs} />
        <Footer />
      </SnackbarProvider>
    </>
  );
}
