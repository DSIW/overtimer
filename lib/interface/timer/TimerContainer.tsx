import 'react-circular-progressbar/dist/styles.css';
import TimeLog from '../../domain/TimeLog';
import {timeLogRepository} from "../../infrastructure/TimeLogRepository";
import {useStopwatch} from "react-timer-hook";
import React, {useEffect} from "react";
import Timer from "./Timer";

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
      const updatedTimeLog = new TimeLog({ ...currentTimeLog, endTime: new Date() })
      await timeLogRepository.update(updatedTimeLog)
    } else {
      start()
      const timeLog = new TimeLog({startTime: new Date()})
      await timeLogRepository.save(timeLog)
    }
  }

  return (
    <Timer timeLogs={timeLogs} onClick={handleStartStop} />
  )
}
