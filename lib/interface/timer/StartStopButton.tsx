import StartButton from "./start-button/StartButton";
import FormDialog from "../form/FormDialog";
import React from "react";
import { useTimeLogs } from "../hooks/useTimeLogs";
import { usePopupState } from "material-ui-popup-state/hooks";
import StopButton from "./StopButton";

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
  const dialogState = usePopupState({
    variant: "popover",
    popupId: "StartStopButton",
  });

  const color = isOverdue ? "secondary" : "primary";
  const timeLog = useTimeLogs()[0];

  async function handleStart() {
    await onClick();
  }

  async function handleExtendedStart() {
    await onClick();
    dialogState.open();
  }

  function close() {
    dialogState.close();
  }

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
          open={dialogState.isOpen}
          timeLog={timeLog}
          onClose={close}
        />
      )}
    </div>
  );
}
