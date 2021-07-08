import { Typography } from '@material-ui/core'
import TimeLog from '../domain/TimeLog'
import Duration from './Duration'
import { isToday } from 'date-fns'

interface Props {
  timeLogs: TimeLog[];
}

export default function TimerLogSummary({ timeLogs }: Props) {
  const todayTotalMs = timeLogs.filter((timeLog) => {
    return isToday(timeLog.startTime)
  }).map(timeLog => {
    return timeLog.getDurationMs()
  }).reduce((sum, val) => sum + val, 0)

  const totalOvertimeMs = timeLogs.filter((timeLog) => {
    return isToday(timeLog.startTime)
  }).map(timeLog => {
    return timeLog.getOverworkDurationMs()
  }).reduce((sum, val) => sum + val, 0)

  return (
    <div style={{ margin: '2rem' }}>
      <Typography color="textSecondary" gutterBottom>
        Total overtime
      </Typography>
      <Typography variant="body2" component="p">
        <Duration milliseconds={totalOvertimeMs} />
      </Typography>
    </div>
  )
}
