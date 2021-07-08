import { format } from 'date-fns'
import TimeLog from '../domain/TimeLog'
import { formatDuration } from './time-utils'

const TIME_FORMAT = "yyyy-MM-dd HH:mm"

interface Props {
  timeLog: TimeLog;
}

export default function TimerLogTableRow({ timeLog }: Props) {

  const duration = timeLog.getDurationMs()
  const overworkDuration = timeLog.getOverworkDurationMs()

  return (
    <tr>
      <td>{format(timeLog.startTime, TIME_FORMAT)}</td>
      <td>{timeLog.endTime ? format(timeLog.endTime, TIME_FORMAT) : 'Running'}</td>
      <td>{formatDuration(duration)}</td>
      <td>{formatDuration(overworkDuration)}</td>
    </tr>
  )
}
