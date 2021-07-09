import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'
import TimeLog from '../domain/TimeLog'
import TimeLogTableRow from './TimeLogTableRow'

interface Props {
  timeLogs: TimeLog[];
  onDelete: (timeLog: TimeLog) => void;
}

export default function TimerLogTable({ timeLogs, onDelete }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table style={{ minWidth: 400, maxWidth: '95vw' }}>
        <TableHead>
          <TableRow>
            <TableCell>DATE</TableCell>
            <TableCell>TIME RANGE</TableCell>
            <TableCell align="right">DURATION</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timeLogs.length === 0 && <TableCell>No entries</TableCell>}
          {timeLogs.map((timeLog: TimeLog) => (
            <TimeLogTableRow key={`${timeLog.startTime}-${timeLog.endTime}`} timeLog={timeLog} onDelete={onDelete} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
