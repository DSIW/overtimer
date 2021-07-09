import React, { useState, useEffect } from 'react'
import { useStopwatch } from 'react-timer-hook'
import TimeLog from '../domain/TimeLog'
import TimeLogTable from './TimeLogTable'
import { timeLogRepository } from '../infrastructure/TimeLogRepository'
import Timer from './Timer'
import TimeLogSummary from './TimeLogSummary'
import TimeLogStatistics from '../domain/TimeLogStatistics'
import { useLiveQuery } from 'dexie-react-hooks'

export default function TimerApp() {
  const [currentTimeLog, setCurrentTimeLog] = useState<TimeLog | null>(null)

  const timeLogs = useLiveQuery(() => timeLogRepository.all(), [], [] as TimeLog[])

  const elapsedMs = currentTimeLog?.getElapsedMs() || 0

  const {
    isRunning,
    start,
    pause,
  } = useStopwatch({ autoStart: false });

  const resetable = !isRunning

  async function handleStartStop() {
    if (isRunning && currentTimeLog) {
      pause()
      const updatedTimeLog = new TimeLog({ ...currentTimeLog, endTime: new Date() })
      await timeLogRepository.updateLast(updatedTimeLog)
      setCurrentTimeLog(null)
    } else {
      start()
      const timeLog = new TimeLog({startTime: new Date()})
      await timeLogRepository.save(timeLog)
      setCurrentTimeLog(timeLog)
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
