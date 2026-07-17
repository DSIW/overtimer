import { format } from "date-fns";
import ChangeEvent, { TimeLogEventTargetName } from "./ChangeEvent";
import * as React from "react";

const TIME_FORMAT = "HH:mm";
const FIVE_MINUTES_IN_SECONDS = 300;

interface Props {
  name: TimeLogEventTargetName;
  label: string;
  defaultTime: Date;
  error: boolean;
  onChange: (event: ChangeEvent) => void;
}

export function TimeField({
  defaultTime,
  error,
  label,
  name,
  onChange,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name}
        className="text-sm font-medium text-content-secondary"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="time"
        step={FIVE_MINUTES_IN_SECONDS}
        defaultValue={format(defaultTime, TIME_FORMAT)}
        autoFocus
        onChange={onChange}
        className={`w-full rounded-md border bg-surface-primary px-3 py-2 text-sm text-content-primary outline-none focus:border-accent ${
          error ? "border-danger" : "border-border-primary"
        }`}
      />
    </div>
  );
}
