import React from 'react'
import TimeLog from '../domain/TimeLog'
import TimeLogTable from './table/TimeLogTable'
import TimeLogSummary from './TimeLogSummary'
import {useLiveQuery} from 'dexie-react-hooks'
import {Action} from './table/TableRowActionButton'
import TimerContainer from './timer/TimerContainer'
import { timerApplicationService } from '../application/TimerApplicationService'
import { SnackbarProvider } from 'notistack';
import PersistenceWarning from './PersistenceWarning';

function useTimeLogs() {
  return useLiveQuery(() => timerApplicationService.getAllTimeLogs(), [], [] as TimeLog[])
}

export default function TimerApp() {
  const timeLogs = useTimeLogs()

  async function handleAction(action: Action, timeLog: TimeLog) {
    switch (action) {
      case 'delete':
        await timerApplicationService.delete(timeLog)
        return;
      case 'edit':
        await timerApplicationService.update(timeLog)
        return;
    }
  }

  return (
    <>
      <SnackbarProvider maxSnack={1}>
        <TimerContainer timeLogs={timeLogs} />
        <TimeLogSummary timeLogs={timeLogs} />
        <PersistenceWarning timeLogs={timeLogs} />
        <TimeLogTable timeLogs={timeLogs} onAction={handleAction} />
      </SnackbarProvider>
    </>
  )
}
