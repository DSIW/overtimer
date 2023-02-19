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
        fill="#8884d8"
        innerRadius={50}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={/without/i.test(entry.name) ? "#1876D2" : "#F44336"}
          />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
