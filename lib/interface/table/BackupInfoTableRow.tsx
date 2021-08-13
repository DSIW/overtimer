import Alert from "@material-ui/lab/Alert";
import React from "react";
import TimeLog from "../../domain/TimeLog";
import { todayWorkdayEnd } from "../../domain/time-constants";
import { format } from "date-fns";
import { TableCell, TableRow } from "@material-ui/core";

interface Props {
  timeLogs: TimeLog[];
}

const formattedWorkdayEnd = format(todayWorkdayEnd(), "HH:mm");
const WARNING_MESSAGE = `Time logs are automatically exported after ${formattedWorkdayEnd}.`;

export default function BackupInfoTableRow({ timeLogs }: Props) {
  if (timeLogs.length <= 0) {
    return null;
  }

  return (
    <TableRow>
      <TableCell colSpan={3} style={{ padding: "0" }}>
        <Alert severity="info" style={{ borderRadius: "0" }}>
          {WARNING_MESSAGE}
        </Alert>
      </TableCell>
    </TableRow>
  );
}
