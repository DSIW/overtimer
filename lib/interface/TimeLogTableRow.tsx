import { TableRow, TableCell, IconButton } from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons'
import { format } from 'date-fns'
import TimeLog from '../domain/TimeLog'
import ActionButton, { Action } from './ActionButton'
import Duration from './Duration'

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
  const formattedEndTime = timeLog.endTime ? format(timeLog.endTime, TIME_FORMAT) : 'Running'

  return (
    <TableRow>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>{formattedStartTime} - {formattedEndTime}</TableCell>
      <TableCell align="right"><Duration milliseconds={duration} zero=">0 s" /></TableCell>
      <TableCell align="right">
        <ActionButton timeLog={timeLog} onAction={onAction} />
      </TableCell>
    </TableRow>
  )
}
