import React, { ReactElement } from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { OvertimeRatioDiagramEntryDto } from "./OvertimeRatioDiagramDataFactory";

interface Props {
  data: OvertimeRatioDiagramEntryDto[];
  width?: number;
}

export default function OvertimeRatioDiagram({
  data,
  width,
}: Props): ReactElement {
  return (
    <PieChart width={width} height={300}>
      <Pie
        data={data}
        dataKey="count"
        nameKey="name"
        fill="var(--color-accent)"
        innerRadius={50}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={
              /without/i.test(entry.name)
                ? "var(--color-accent)"
                : "var(--color-danger)"
            }
          />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
