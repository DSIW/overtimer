import {TextField} from "@material-ui/core";
import {format} from "date-fns";
import ChangeEvent, {TimeLogEventTargetName} from "./ChangeEvent";
import * as React from "react";

const TIME_FORMAT = "HH:mm"

interface Props {
  name: TimeLogEventTargetName;
  label: string;
  defaultTime: Date;
  error: boolean;
  onChange: (event: ChangeEvent) => void;
}

export function TimeField({defaultTime, error, label, name, onChange}: Props) {
  return <TextField
      id={name}
      name={name}
      label={label}
      type="time"
      defaultValue={format(defaultTime, TIME_FORMAT)}
      error={error}
      autoFocus
      margin="dense"
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
      inputProps={{
        step: 300, // 5 min
      }}
      onChange={onChange}
  />;
}
