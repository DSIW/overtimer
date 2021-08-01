import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { exportImportApplicationService } from "../application/ExportImportApplicationService";
import TimeLog from "../domain/TimeLog";
import parseMs from "./parse-ms";

interface Props {
  timeLogs: TimeLog[];
}

export default function BackupReminder({ timeLogs }: Props) {
  const [open, setOpen] = useState(false);

  const { isBackupNecessary, days } = useLiveQuery(
    () => exportImportApplicationService.getLastBackupInformation(),
    [],
    [] as Backup[]
  );

  let days = 0;
  if (timeLogs.length > 0) {
    days = parseMs(+new Date() - +timeLogs[0].startTime).hours;
  }

  useEffect(() => {
    if (days >= 2) {
      setOpen(true);
    }
  }, [days, open]);

  function close() {
    setOpen(false);
  }

  function handleCancel() {
    console.log("cancel");
    close();
  }

  function handleExport() {
    console.log("export");
    close();
  }

  function withUnit(value: number, singularText: string, pluralText: string) {
    const unit = value === 1 ? singularText : pluralText;
    return `${value} ${unit}`;
  }

  let lastBackupMessage = "Your last backup was never done.";
  if (days > 0) {
    lastBackupMessage = `Your last backup was done ${withUnit(
      days,
      "day",
      "days"
    )} ago.`;
  }

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Backup?</DialogTitle>
      <DialogContent>{lastBackupMessage}</DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Remind me tomorrow
        </Button>
        <Button variant="contained" onClick={handleExport} color="primary">
          Export
        </Button>
      </DialogActions>
    </Dialog>
  );
}
