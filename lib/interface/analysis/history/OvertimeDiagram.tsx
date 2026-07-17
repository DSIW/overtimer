import React, { Fragment, ReactElement } from "react";
import {
  Legend,
  Line,
  LineChart,
  Tooltip,
  TooltipContentProps,
  XAxis,
  YAxis,
} from "recharts";
import { OvertimeDiagramEntryDto } from "./OvertimeDiagramDataFactory";
import Duration from "../../../domain/analysis/Duration";
import OvertimerTooltip from "../OvertimerTooltip";

interface Props {
  data: OvertimeDiagramEntryDto[];
  width?: number;
}

function formatDuration(milliseconds: number): string {
  return new Duration(milliseconds).getFormattedHours();
}

export default function OvertimeDiagram({ data, width }: Props): ReactElement {
  function renderTooltip(props: TooltipContentProps): ReactElement {
    return (
      <OvertimerTooltip {...props}>
        {(data: OvertimeDiagramEntryDto) => (
          <Fragment>
            <strong>{data.tooltipName}</strong>
            <p>Overtime: {formatDuration(data.overtime)}</p>
            <p>Cumulated: {formatDuration(data.cumulated)}</p>
          </Fragment>
        )}
      </OvertimerTooltip>
    );
  }

  return (
    <LineChart width={width} height={300} data={data}>
      <XAxis dataKey="name" />
      <YAxis yAxisId="left" tickFormatter={formatDuration} />
      <Line
        yAxisId="left"
        type="monotone"
        dataKey="overtime"
        stroke="var(--color-accent)"
        dot={false}
      />
      <Line
        yAxisId="left"
        type="monotone"
        dataKey="cumulated"
        stroke="var(--color-content-tertiary)"
        strokeDasharray="5 5"
        dot={false}
      />
      <Legend />
      <Tooltip content={renderTooltip} />
    </LineChart>
  );
}
