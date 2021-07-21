import React from 'react'
import TimeLog from '../domain/TimeLog'
import TimeLogTable from './table/TimeLogTable'
import TimeLogSummary from './TimeLogSummary'
import {useLiveQuery} from 'dexie-react-hooks'
import {Action} from './table/TableRowActionButton'
import TimerContainer from './timer/TimerContainer'
import { timerApplicationService } from '../application/TimerApplicationService'
import { SnackbarProvider } from 'notistack';

function useTimeLogs() {
  return useLiveQuery(() => timerApplicationService.getAllTimeLogs(), [], [] as TimeLog[])
}

export default function TimerApp() {
  const timeLogs = useTimeLogs()

  Notification.requestPermission()

  async function showNotification(text: string) {
    if (Notification.permission == 'granted') {
      const reg = await navigator.serviceWorker.getRegistration()
      reg && reg.showNotification(text)
    }
  }

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
        <button onClick={() => showNotification("test")}>Show notification</button>
        <TimeLogSummary timeLogs={timeLogs} />
        <TimeLogTable timeLogs={timeLogs} onAction={handleAction} />
      </SnackbarProvider>
    </>
  )
}
