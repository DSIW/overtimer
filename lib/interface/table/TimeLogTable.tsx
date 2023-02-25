import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TimeLog from "../../domain/TimeLog";
import EmptyTableRow from "./EmptyTableRow";
import ExportImportActionButton from "./backup/ExportImportActionButton";
import TimeLogTableRow from "./TimeLogTableRow";
import BackupInfoTableRow from "./backup/BackupInfoTableRow";
import React from "react";
import { useTimeLogCount } from "../hooks/useTimeLogCount";
import MoreEntriesTableRow from "./MoreEntriesTableRow";

interface Props {
  timeLogs: TimeLog[];
}

export default function TimerLogTable({ timeLogs }: Props) {
  const totalCount = useTimeLogCount();
  const hiddenTimeLogCount = totalCount - timeLogs.length;
  const moreTimeLogs = hiddenTimeLogCount > 0;

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
          {moreTimeLogs && <MoreEntriesTableRow count={hiddenTimeLogCount} />}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
