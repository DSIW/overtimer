import { TableRow, TableCell } from '@material-ui/core'
import { format } from 'date-fns'
import TimeLog from '../domain/TimeLog'
import Duration from './Duration'

const TIME_FORMAT = "yyyy-MM-dd HH:mm"

interface Props {
  timeLog: TimeLog;
}

export default function TimerLogTableRow({ timeLog }: Props) {

  const duration = timeLog.getDurationMs()
  const overworkDuration = timeLog.getOverworkDurationMs()

  return (
    <TableRow>
      <TableCell>{format(timeLog.startTime, TIME_FORMAT)}</TableCell>
      <TableCell>{timeLog.endTime ? format(timeLog.endTime, TIME_FORMAT) : 'Running'}</TableCell>
      <TableCell align="right"><Duration milliseconds={duration} zero=">0 s" /></TableCell>
      <TableCell align="right"><Duration milliseconds={overworkDuration} /></TableCell>
    </TableRow>
  )
}
