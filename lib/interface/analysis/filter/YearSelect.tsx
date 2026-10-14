import React from "react";

interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  years: number[];
}

export const ALL_YEARS = "all";

export default function YearSelect(props: Props) {
  return (
    <select
      value={props.value}
      onChange={props.onChange}
      className="rounded-md border border-border-primary bg-surface-primary px-3 py-1.5 text-sm text-content-primary"
    >
      <option value={ALL_YEARS}>All</option>
      {props.years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}
