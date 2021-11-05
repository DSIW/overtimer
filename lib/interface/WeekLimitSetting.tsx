import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { ChangeEvent } from "react";
import styles from "./WeekLimitSetting.module.css";

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
      <FormControl className={styles.formControl}>
        <InputLabel id="week-limit-select-label">Time log limit</InputLabel>
        <Select
          labelId="week-limit-select-label"
          id="week-limit-select"
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
      </FormControl>
    </div>
  );
}
