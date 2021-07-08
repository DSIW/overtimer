import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'
import TimeLog from '../domain/TimeLog'
import TimeLogTableRow from './TimeLogTableRow'

interface Props {
  timeLogs: TimeLog[];
}

export default function TimerLogTable({ timeLogs }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table style={{ minWidth: 500 }}>
        <TableHead>
          <TableRow>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Overtime</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timeLogs.length === 0 && <div>No entries</div>}
          {timeLogs.map((timeLog: TimeLog) => (
            <TimeLogTableRow key={`${timeLog.startTime}-${timeLog.endTime}`} timeLog={timeLog} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
