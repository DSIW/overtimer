import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@material-ui/core";
import { ChangeEvent } from "react";

interface Props {
  weekLimit: number;
  onChange: (value: number) => void;
  enabledWeekLimit: number;
}

export default function WeekLimitSetting({
  weekLimit,
  onChange,
  enabledWeekLimit,
}: Props) {
  function handleChange(_: ChangeEvent, checked: boolean) {
    onChange(checked ? enabledWeekLimit : 999);
  }

  const checked = weekLimit === enabledWeekLimit;

  return (
    <div>
      <FormGroup row>
        <FormControlLabel
          value={checked}
          control={<Switch onChange={handleChange} />}
          label={`Limit to ${enabledWeekLimit} weeks`}
          labelPlacement="end"
        />
      </FormGroup>
    </div>
  );
}
