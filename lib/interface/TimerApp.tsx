import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { formatDuration } from 'date-fns'
import { useStopwatch } from 'react-timer-hook'
import TimeLog from '../domain/TimeLog'
import TimeLogTable from './TimeLogTable'
import { timeLogRepository } from '../infrastructure/TimeLogRepository'
import Timer from './Timer'

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
    reset,
  } = useStopwatch({ autoStart: false });

  const resetable = !isRunning

  function handleStartStop() {
    if (isRunning && currentTimeLog) {
      pause()
      const updatedTimeLog = new TimeLog({ ...currentTimeLog, endTime: new Date() })
      setCurrentTimeLog(updatedTimeLog)
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

  function handleReset() {
    reset(0, false)
    setCurrentTimeLog(null)
  }

  return (
    <>
      <Timer elapsedMs={elapsedMs} />

      <Button variant="contained" color="primary" onClick={handleStartStop} style={{ marginTop: '1rem' }}>
        {isRunning ? 'Stop' : 'Start'}
      </Button>

      <Button variant="outlined" color="primary" disabled={!resetable} onClick={handleReset} style={{ marginTop: '1rem', marginBottom: '2rem' }}>
        Reset
      </Button>

      <TimeLogTable timeLogs={timeLogs} />
    </>
  )
}
