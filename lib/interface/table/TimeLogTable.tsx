import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'
import TimeLog from '../../domain/TimeLog'
import EmptyTableRow from './EmptyTableRow'
import { Action } from './TableRowActionButton'
import TimeLogTableRow from './TimeLogTableRow'

interface Props {
  timeLogs: TimeLog[];
  onAction: (action: Action, timeLog: TimeLog) => void;
}

export default function TimerLogTable({ timeLogs, onAction }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table style={{ minWidth: 400, maxWidth: '95vw' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">DATE</TableCell>
            <TableCell align="right">DURATION</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timeLogs.length === 0 && <EmptyTableRow />}
          {timeLogs.map((timeLog: TimeLog) => (
            <TimeLogTableRow key={`${timeLog.startTime}-${timeLog.endTime}`} timeLog={timeLog} onAction={onAction} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
