import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import TimeLog from "../../domain/TimeLog";
import EmptyTableRow from "./EmptyTableRow";
import ExportImportActionButton from "./backup/ExportImportActionButton";
import { Action } from "./TableRowActionButton";
import TimeLogTableRow from "./TimeLogTableRow";
import { timeLogApplicationService } from "../../application/TimeLogApplicationService";
import BackupInfoTableRow from "./backup/BackupInfoTableRow";
import React from "react";

interface Props {
  timeLogs: TimeLog[];
}

export default function TimerLogTable({ timeLogs }: Props) {
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
          <BackupInfoTableRow timeLogs={timeLogs} />
        </TableHead>
        <TableBody>
          {timeLogs.length === 0 && <EmptyTableRow />}
          {timeLogs.map((timeLog: TimeLog) => (
            <TimeLogTableRow
              key={`${timeLog.startTime}-${timeLog.endTime}`}
              timeLog={timeLog}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
