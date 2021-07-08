import TimeLog from '../domain/TimeLog'
import TimeLogTableRow from './TimeLogTableRow'

interface Props {
  timeLogs: TimeLog[];
}

export default function TimerLogTable({ timeLogs }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <td>Start Time</td>
          <td>End Time</td>
          <td>Duration Time</td>
          <td>Overtime</td>
        </tr>
      </thead>
      <tbody>
        {timeLogs.length === 0 && <div>No entries</div>}
        {timeLogs.map((timeLog: TimeLog) => (
          <TimeLogTableRow key={`${timeLog.startTime}-${timeLog.endTime}`} timeLog={timeLog} />
        ))}
      </tbody>
    </table>
  )
}
