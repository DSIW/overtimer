import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { useStopwatch } from 'react-timer-hook'
import TimeLog from '../domain/TimeLog'
import TimeLogTable from './TimeLogTable'
import { timeLogRepository } from '../infrastructure/TimeLogRepository'
import Timer from './Timer'
import TimeLogSummary from './TimeLogSummary'
import { isToday } from 'date-fns'

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

  const todayTotalMs = timeLogs.filter((timeLog) => {
    return isToday(timeLog.startTime)
  }).map(timeLog => {
    return timeLog.getDurationMs()
  }).reduce((sum, val) => sum + val, 0)

  return (
    <>
      <Timer elapsedMs={todayTotalMs + elapsedMs} isRunning={isRunning} onClick={handleStartStop} />

      <TimeLogSummary timeLogs={timeLogs} />

      <TimeLogTable timeLogs={timeLogs} />
    </>
  )
}
