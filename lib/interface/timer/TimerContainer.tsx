import "react-circular-progressbar/dist/styles.css";
import TimeLog from "../../domain/TimeLog";
import { useStopwatch } from "react-timer-hook";
import React, { useEffect, useState } from "react";
import Timer from "./Timer";
import { timerApplicationService } from "../../application/TimerApplicationService";
import useWindowFocus from "use-window-focus";
import TimeLogStatistics from "../../domain/TimeLogStatistics";
import useTimerNotification from "./useTimerNotification";
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

  const { isRunning, value, isOverdue, pauseMs } = new TimeLogStatistics(
    timeLogs
  ).getTimerValues();

  // Re-render every second during a pause, because the stopwatch is paused
  const [, setTick] = useState(0);
  const isPauseActive = pauseMs !== undefined;
  useEffect(() => {
    if (!isPauseActive) {
      return;
    }
    const interval = setInterval(() => setTick((tick) => tick + 1), 1000);
    return () => clearInterval(interval);
  }, [isPauseActive]);

  const formattedDuration = new Duration(value).getFormattedMaxHours();

  useTimerNotification(
    isRunning,
    isOverdue ? "Stop working!" : `${formattedDuration} remaining`
  );

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
