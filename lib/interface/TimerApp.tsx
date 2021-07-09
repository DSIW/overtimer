import React, { useState, useEffect } from 'react'
import { useStopwatch } from 'react-timer-hook'
import TimeLog from '../domain/TimeLog'
import TimeLogTable from './TimeLogTable'
import { timeLogRepository } from '../infrastructure/TimeLogRepository'
import Timer from './Timer'
import TimeLogSummary from './TimeLogSummary'
import TimeLogStatistics from '../domain/TimeLogStatistics'
import { useLiveQuery } from 'dexie-react-hooks'
import { Action } from './FormDialog'

export default function TimerApp() {
  const timeLogs = useLiveQuery(() => timeLogRepository.all(), [], [] as TimeLog[])

  const currentTimeLog = timeLogs[0]

  const elapsedMs = currentTimeLog?.getElapsedMs() || 0

  const {
    isRunning,
    start,
    pause,
  } = useStopwatch({ autoStart: false })

  useEffect(() => {
    if (currentTimeLog?.isRunning()) {
      start()
    }
  }, [currentTimeLog])

  const resetable = !isRunning

  async function handleStartStop() {
    if (isRunning && currentTimeLog) {
      pause()
      const updatedTimeLog = new TimeLog({ ...currentTimeLog, endTime: new Date() })
      await timeLogRepository.update(updatedTimeLog)
    } else {
      start()
      const timeLog = new TimeLog({startTime: new Date()})
      await timeLogRepository.save(timeLog)
    }
  }

  async function handleAction(action: Action, timeLog: TimeLog) {
    switch (action) {
      case 'delete':
        await timeLogRepository.delete(timeLog)
        return;
      case 'edit':
        await timeLogRepository.update(timeLog)
        return;
    }
  }

  const todayTotalMs = new TimeLogStatistics(timeLogs).getTodayTotalMs();

  return (
    <>
      <Timer elapsedMs={todayTotalMs + elapsedMs} isRunning={isRunning} onClick={handleStartStop} />

      <TimeLogSummary timeLogs={timeLogs} />

      <TimeLogTable timeLogs={timeLogs} onAction={handleAction} />
    </>
  )
}
