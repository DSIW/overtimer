import {
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
} from "@material-ui/core";
import { ChangeEvent } from "react";

interface Props {
  weekLimit: number;
  onChange: (value: number) => void;
}

export default function WeekLimitSetting({ weekLimit, onChange }: Props) {
  function handleChange(event: ChangeEvent<{ value: unknown }>) {
    onChange(event.target.value as number);
  }

  return (
    <div>
      <FormGroup row>
        <FormControlLabel
          control={
            <Select
              labelId="week-limmit"
              id="week-limit"
              value={weekLimit}
              onChange={handleChange}
            >
              <MenuItem value={1}>1 Woche</MenuItem>
              <MenuItem value={1 * 4}>1 Monat</MenuItem>
              <MenuItem value={2 * 4}>2 Monate</MenuItem>
              <MenuItem value={4 * 4}>4 Monate</MenuItem>
              <MenuItem value={6 * 4}>6 Monate</MenuItem>
              <MenuItem value={52}>1 Jahr</MenuItem>
            </Select>
          }
          label={`Limit times logs to `}
          labelPlacement="start"
        />
      </FormGroup>
    </div>
  );
}
