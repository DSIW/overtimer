import { format } from 'date-fns'
import TimeLog from './TimeLog'

const TIME_FORMAT = "yyyy-MM-dd HH:mm"

interface Props {
  timeLogs: TimeLog[];
}

function parseMs(milliseconds: number) {
  return {
    days: Math.trunc(milliseconds / 86400000),
    hours: Math.trunc(milliseconds / 3600000) % 24,
    minutes: Math.trunc(milliseconds / 60000) % 60,
    seconds: Math.trunc(milliseconds / 1000) % 60,
    milliseconds: Math.trunc(milliseconds) % 1000,
  };
}

function formatDuration(durationMs: number) {
  if (durationMs === 0) {
    return ">0 m"
  }

  const { hours, minutes, seconds } = parseMs(durationMs)

  const pad = (num: number) => `0${num}`.slice(-2)

  return `${pad(hours)} h ${pad(minutes)} m ${pad(seconds)} s`
}

export default function TimerLogTableRow({ timeLog }: Props) {

  const duration = timeLog.getDuration()
  const overworkDuration = timeLog.getOverworkDuration()

  return (
    <tr>
      <td>{format(timeLog.startTime, TIME_FORMAT)}</td>
      <td>{timeLog.endTime ? format(timeLog.endTime, TIME_FORMAT) : 'Running'}</td>
      <td>{formatDuration(duration)}</td>
      <td>{formatDuration(overworkDuration)}</td>
    </tr>
  )
}
