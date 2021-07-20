import 'react-circular-progressbar/dist/styles.css';
import TimeLog from '../../domain/TimeLog';
import {timeLogRepository} from "../../infrastructure/TimeLogRepository";
import {useStopwatch} from "react-timer-hook";
import React, {useEffect} from "react";
import Timer from "./Timer";
import { timerApplicationService } from '../../application/TimerApplicationService';

interface Props {
  timeLogs: TimeLog[];
}

export default function TimerContainer({ timeLogs }: Props) {
  const currentTimeLog = timeLogs[0]

  const {
    start,
    pause,
  } = useStopwatch({ autoStart: false })

  useEffect(() => {
    if (currentTimeLog?.isRunning()) {
      start()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTimeLog])

  async function handleStartStop() {
    if (currentTimeLog && currentTimeLog.isRunning()) {
      pause()
      await timerApplicationService.stop(currentTimeLog)
    } else {
      start()
      await timerApplicationService.start()
    }
  }

  return (
    <Timer timeLogs={timeLogs} onClick={handleStartStop} />
  )
}
