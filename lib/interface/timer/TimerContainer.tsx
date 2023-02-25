import "react-circular-progressbar/dist/styles.css";
import TimeLog from "../../domain/TimeLog";
import { useStopwatch } from "react-timer-hook";
import React, { useEffect } from "react";
import Timer from "./Timer";
import { timerApplicationService } from "../../application/TimerApplicationService";
import useWindowFocus from "use-window-focus";
import {
  closeTimerNotification,
  requestNotificationPermission,
  showTimerNotificationIfGranted,
} from "../../infrastructure/notification/Notification";
import TimeLogStatistics from "../../domain/TimeLogStatistics";
import Duration from "../../domain/analysis/Duration";

interface Props {
  timeLogs: TimeLog[];
}

function useNotification() {
  useEffect(() => {
    requestNotificationPermission();
  }, []);
}

export default function TimerContainer({ timeLogs }: Props) {
  const currentTimeLog = timeLogs[0];

  // Update on focus for reset after midnight
  useWindowFocus();

  useNotification();

  const { start, pause } = useStopwatch({ autoStart: false });

  useEffect(() => {
    if (currentTimeLog?.isRunning()) {
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTimeLog]);

  const statistics = new TimeLogStatistics(timeLogs);

  const { isRunning, value } = statistics.getTimerValues();

  useEffect(() => {
    async function handleAction() {
      const reg = await navigator.serviceWorker.getRegistration();
      if (!reg) {
        return;
      }
      reg.addEventListener(
        "notificationclick",
        (event: unknown) => {
          // eslint-disable-next-line no-console
          console.log({ event });
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (event.action === "stopTimer") {
            handleStartStop();
          }
        },
        false
      );
    }

    if (isRunning) {
      showTimerNotificationIfGranted(
        "Timer is running",
        `Remaining: ${new Duration(value).getFormatted(true)}`,
        [
          {
            title: "stop",
            action: "stopTimer",
          },
        ],
        true
      );

      handleAction();
    } else {
      closeTimerNotification();
    }

    return () => {
      // TODO
    };
  }, [isRunning, value]);

  async function handleStartStop() {
    if (currentTimeLog && currentTimeLog.isRunning()) {
      pause();
      await timerApplicationService.stop(currentTimeLog);
    } else {
      start();
      await timerApplicationService.start();
    }
  }

  // <Button onClick={() => showNotificationIfGranted("title", "body", [])}>
  //   Show notification
  // </Button>

  return <Timer timeLogs={timeLogs} onClick={handleStartStop} />;
}
