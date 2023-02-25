import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import React from "react";
import { MenuItem, Select } from "@mui/material";

interface Props {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  years: number[];
}

export const ALL_YEARS = "all";

export default function YearSelect(props: Props) {
  return (
    <Select value={props.value} onChange={props.onChange}>
      <MenuItem value={ALL_YEARS}>All</MenuItem>
      {props.years.map((year) => (
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      ))}
    </Select>
  );
}
