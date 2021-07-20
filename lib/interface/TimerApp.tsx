import React from 'react'
import TimeLog from '../domain/TimeLog'
import TimeLogTable from './table/TimeLogTable'
import {timeLogRepository} from '../infrastructure/TimeLogRepository'
import TimeLogSummary from './TimeLogSummary'
import {useLiveQuery} from 'dexie-react-hooks'
import {Action} from './table/TableRowActionButton'
import TimerContainer from './timer/TimerContainer'
import { timerApplicationService } from '../application/TimerApplicationService'

function useTimeLogs() {
  return useLiveQuery(() => timerApplicationService.getAllTimeLogs(), [], [] as TimeLog[])
}

export default function TimerApp() {
  const timeLogs = useTimeLogs()

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
