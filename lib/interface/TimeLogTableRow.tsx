import { TableRow, TableCell, IconButton } from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons'
import { format } from 'date-fns'
import TimeLog from '../domain/TimeLog'
import Duration from './Duration'

const DATE_FORMAT = "yyyy-MM-dd"
const TIME_FORMAT = "HH:mm"

interface Props {
  timeLog: TimeLog;
  onDelete: (timeLog: TimeLog) => void;
}

export default function TimerLogTableRow({ timeLog, onDelete }: Props) {

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
        {timeLog.isDone() && (
          <IconButton onClick={() => onDelete(timeLog)}>
            <DeleteOutline />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  )
}
