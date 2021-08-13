import { AlertTitle } from "@material-ui/lab";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import TimeLog from "../domain/TimeLog";
import { todayWorkdayEnd } from "../domain/time-constants";
import { format } from "date-fns";

interface Props {
  timeLogs: TimeLog[];
}

const formattedWorkdayEnd = format(todayWorkdayEnd(), "HH:mm");
const WARNING_MESSAGE = `Time logs are automatically exported after ${formattedWorkdayEnd}.`;

export default function BackupInfo({ timeLogs }: Props) {
  if (timeLogs.length <= 0) {
    return null;
  }

  return (
    <div style={{ width: "100%", marginBottom: "2rem" }}>
      <Alert severity="info">
        {WARNING_MESSAGE}
      </Alert>
    </div>
  );
}
