import Button from "@mui/material/Button";
import { Stop } from "@mui/icons-material";
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
