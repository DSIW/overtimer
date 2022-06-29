import React from "react";
import ButtonWithOptions from "./ButtonWithOptions";
import { PlayArrow } from "@mui/icons-material";

interface Props {
  color: "primary" | "secondary";
  onStart: () => void;
  onExtendedStart: () => Promise<void>;
}

export default function StartButton({
  color,
  onStart,
  onExtendedStart,
}: Props) {
  return (
    <ButtonWithOptions
      color={color}
      startIcon={<PlayArrow fontSize="large" />}
      onClick={onStart}
      options={[
        {
          key: "extended-start",
          name: "Start with time",
          onClick: onExtendedStart,
        },
      ]}
    >
      Start
    </ButtonWithOptions>
  );
}
