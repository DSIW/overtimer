import StartButton from "./start-button/StartButton";
import FormDialog from "../form/FormDialog";
import React, { useState } from "react";
import { useTimeLogs } from "../hooks/useTimeLogs";
import StopButton from "./StopButton";
import TimeLog from "../../domain/TimeLog";

interface Props {
  isRunning: boolean;
  isOverdue: boolean;
  onClick: () => Promise<void>;
}

export default function StartStopButton({
  isRunning,
  isOverdue,
  onClick,
}: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const color = isOverdue ? "secondary" : "primary";
  const timeLog: TimeLog | undefined = useTimeLogs()[0];

  async function handleStart() {
    await onClick();
  }

  async function handleExtendedStart() {
    await onClick();
    setDialogOpen(true);
  }

  function close() {
    setDialogOpen(false);
  }

  // Wait for persisted running timeLog
  const isExtendedStartFormOpen = dialogOpen && timeLog?.isRunning();

  return (
    <div style={{ marginTop: "1rem", width: "143px" }}>
      {isRunning ? (
        <StopButton color={color} onClick={onClick} />
      ) : (
        <StartButton
          color={color}
          onStart={handleStart}
          onExtendedStart={handleExtendedStart}
        />
      )}
      {timeLog && (
        <FormDialog
          open={isExtendedStartFormOpen}
          timeLog={timeLog}
          onClose={close}
        />
      )}
    </div>
  );
}
