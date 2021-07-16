import React from 'react'
import TimeLog from '../domain/TimeLog'
import TimeLogTable from './TimeLogTable'
import {timeLogRepository} from '../infrastructure/TimeLogRepository'
import TimeLogSummary from './TimeLogSummary'
import {useLiveQuery} from 'dexie-react-hooks'
import {Action} from './ActionButton'
import TimerContainer from './timer/TimerContainer'

export default function TimerApp() {
  const timeLogs = useLiveQuery(() => timeLogRepository.all(), [], [] as TimeLog[])

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

  return (
    <>
      <TimerContainer timeLogs={timeLogs} />
      <TimeLogSummary timeLogs={timeLogs} />
      <TimeLogTable timeLogs={timeLogs} onAction={handleAction} />
    </>
  )
}
