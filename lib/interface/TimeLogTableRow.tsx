import { TableRow, TableCell } from '@material-ui/core'
import { format } from 'date-fns'
import TimeLog from '../domain/TimeLog'
import ActionButton, { Action } from './ActionButton'
import Duration from './Duration'
import TitleDescription from './TitleDescription'

const DATE_FORMAT = "yyyy-MM-dd"
const TIME_FORMAT = "HH:mm"

interface Props {
  timeLog: TimeLog;
  onAction: (action: Action, timeLog: TimeLog) => void;
}

export default function TimerLogTableRow({ timeLog, onAction }: Props) {

  const duration = timeLog.getDurationMs()

  const formattedDate = format(timeLog.startTime, DATE_FORMAT)
  const formattedStartTime = format(timeLog.startTime, TIME_FORMAT)
  const formattedEndTime = timeLog.endTime && format(timeLog.endTime, TIME_FORMAT)

  const formattedTimeRange = timeLog.endTime ? `${formattedStartTime} - ${formattedEndTime}` : `started ${formattedStartTime}`
  const formattedDuration = <Duration milliseconds={duration} zero=">0 s" />

  return (
    <TableRow>
      <TableCell>{formattedDate}</TableCell>
      <TableCell align="right" style={{ minWidth: '120px' }}>
        <TitleDescription title={formattedDuration} description={formattedTimeRange} />
      </TableCell>
      <TableCell align="right">
        <ActionButton timeLog={timeLog} onAction={onAction} />
      </TableCell>
    </TableRow>
  )
}
