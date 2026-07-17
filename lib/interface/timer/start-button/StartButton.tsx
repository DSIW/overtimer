import React from "react";
import ButtonWithOptions from "./ButtonWithOptions";
import { Play } from "lucide-react";

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
      startIcon={<Play size={22} />}
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
