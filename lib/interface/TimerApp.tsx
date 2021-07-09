import React, { useState, useEffect } from 'react'
import { useStopwatch } from 'react-timer-hook'
import TimeLog from '../domain/TimeLog'
import TimeLogTable from './TimeLogTable'
import { timeLogRepository } from '../infrastructure/TimeLogRepository'
import Timer from './Timer'
import TimeLogSummary from './TimeLogSummary'
import TimeLogStatistics from '../domain/TimeLogStatistics'

export default function TimerApp() {
  const [timeLogs, setTimeLogs] = useState<TimeLog[]>([])
  const [currentTimeLog, setCurrentTimeLog] = useState<TimeLog | null>(null)

  const elapsedMs = currentTimeLog?.getElapsedMs() || 0

  useEffect(() => {
    setTimeLogs(timeLogRepository.all())
  }, []);

  const {
    isRunning,
    start,
    pause,
  } = useStopwatch({ autoStart: false });

  const resetable = !isRunning

  function handleStartStop() {
    if (isRunning && currentTimeLog) {
      pause()
      const updatedTimeLog = new TimeLog({ ...currentTimeLog, endTime: new Date() })
      setCurrentTimeLog(null)
      timeLogRepository.updateLast(updatedTimeLog)
      setTimeLogs(timeLogRepository.all())
    } else {
      start()
      const newTimeLog = new TimeLog({startTime: new Date(), endTime: null})
      setCurrentTimeLog(newTimeLog)
      timeLogRepository.save(newTimeLog)
      setTimeLogs(timeLogRepository.all())
    }
  }

  const todayTotalMs = new TimeLogStatistics(timeLogs).getTodayTotalMs();

  return (
    <>
      <Timer elapsedMs={todayTotalMs + elapsedMs} isRunning={isRunning} onClick={handleStartStop} />

      <TimeLogSummary timeLogs={timeLogs} />

      <TimeLogTable timeLogs={timeLogs} />
    </>
  )
}
