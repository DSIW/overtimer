import Button from "@material-ui/core/Button";
import { Stop } from "@material-ui/icons";
import React from "react";

interface Props {
  color: "primary" | "secondary";
  onClick: () => void;
}

export default function StopButton({ color, onClick }: Props) {
  return (
    <Button
      variant="outlined"
      color={color}
      onClick={onClick}
      startIcon={<Stop fontSize="large" />}
      fullWidth
    >
      Stop
    </Button>
  );
}
