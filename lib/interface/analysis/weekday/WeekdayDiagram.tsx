import React, { Fragment, ReactElement } from "react";
import Duration from "../../Duration";
import { Bar, BarChart, Legend, Tooltip, TooltipProps, XAxis } from "recharts";
import { WeekdayDiagramEntryDto } from "./WeekdayDiagramDataFactory";
import OvertimerTooltip from "../OvertimerTooltip";

interface Props {
  data: WeekdayDiagramEntryDto[];
  width?: number;
}

export default function WeekdayDiagram({ data, width }: Props): ReactElement {
  function renderTooltip(props: TooltipProps<number, string>): ReactElement {
    return (
      <OvertimerTooltip {...props}>
        {(data: WeekdayDiagramEntryDto) => (
          <Fragment>
            <strong>{data.weekday}</strong>
            <p>
              Work: <Duration milliseconds={data.work} />
            </p>
            <p>
              Overtime: <Duration milliseconds={data.overtime} />
            </p>
            <p>
              Pause: <Duration milliseconds={data.pause} />
            </p>
          </Fragment>
        )}
      </OvertimerTooltip>
    );
  }

  return (
    <BarChart width={width} height={300} data={data}>
      <XAxis dataKey="weekdayShort" type="category" />
      <Bar dataKey="pause" fill="green" stackId="a" />
      <Bar dataKey="work" fill="#1876D2" stackId="a" />
      <Bar dataKey="overtime" fill="#F44336" stackId="a" />
      <Legend />
      <Tooltip content={renderTooltip} />
    </BarChart>
  );
}
