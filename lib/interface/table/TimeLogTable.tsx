import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import TimeLog from "../../domain/TimeLog";
import EmptyTableRow from "./EmptyTableRow";
import ExportImportActionButton from "./ExportImportActionButton";
import { Action } from "./TableRowActionButton";
import TimeLogTableRow from "./TimeLogTableRow";
import { timerApplicationService } from "../../application/TimerApplicationService";

interface Props {
  timeLogs: TimeLog[];
}

export default function TimerLogTable({ timeLogs }: Props) {
  async function handleAction(action: Action, timeLog: TimeLog) {
    switch (action) {
      case "delete":
        await timerApplicationService.delete(timeLog);
        return;
      case "edit":
        await timerApplicationService.update(timeLog);
        return;
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table style={{ minWidth: 400, maxWidth: "95vw" }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">DATE</TableCell>
            <TableCell align="right">DURATION</TableCell>
            <TableCell align="right">
              <ExportImportActionButton />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timeLogs.length === 0 && <EmptyTableRow />}
          {timeLogs.map((timeLog: TimeLog) => (
            <TimeLogTableRow
              key={`${timeLog.startTime}-${timeLog.endTime}`}
              timeLog={timeLog}
              onAction={handleAction}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
