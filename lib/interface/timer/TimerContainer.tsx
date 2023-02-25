import "react-circular-progressbar/dist/styles.css";
import TimeLog from "../../domain/TimeLog";
import { useStopwatch } from "react-timer-hook";
import React, { useEffect } from "react";
import Timer from "./Timer";
import { timerApplicationService } from "../../application/TimerApplicationService";
import useWindowFocus from "use-window-focus";
import {
  closeTimerNotification,
  showTimerNotificationIfGranted,
} from "../../infrastructure/notification/Notification";
import TimeLogStatistics from "../../domain/TimeLogStatistics";
import Duration from "../../domain/analysis/Duration";

interface Props {
  timeLogs: TimeLog[];
}

export default function TimerContainer({ timeLogs }: Props) {
  const currentTimeLog = timeLogs[0];

  // Update on focus for reset after midnight
  useWindowFocus();

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
    if (isRunning) {
      showTimerNotificationIfGranted(
        "Timer is running",
        `Remaining: ${new Duration(value).getFormatted(true)}`,
        [],
        true
      );
    } else {
      closeTimerNotification();
    }
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

  return <Timer timeLogs={timeLogs} onClick={handleStartStop} />;
}
