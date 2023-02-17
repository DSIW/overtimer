import React, { ReactElement } from "react";
import Duration from "../Duration";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Legend,
  TooltipProps
} from "recharts";
import { DiagramEntriesDto } from "../../domain/analysis/WeekdayDiagramDataFactory";

interface Props {
  data: DiagramEntriesDto;
}

export default function WeekdayDiagram({ data }: Props): ReactElement {
  function renderTooltip(props: TooltipProps<number, string>): ReactElement {
    const { active, payload } = props;

    if (active && payload && payload.length) {
      const data = payload[0] && payload[0].payload;

      return (
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #999",
            margin: 0,
            padding: 10
          }}
        >
          <p>{data.weekday}</p>
          <p>
            Work: <Duration milliseconds={data.work} />
          </p>
          <p>
            Overtime: <Duration milliseconds={data.overtime} />
          </p>
          <p>
            Pause: <Duration milliseconds={data.pause} />
          </p>
        </div>
      );
    }

    return <></>;
  }

  return (
    <BarChart width={450} height={300} data={data}>
      <XAxis dataKey="weekday" />
      <Bar dataKey="pause" fill="green" stackId="a" />
      <Bar dataKey="work" fill="#1876D2" stackId="a" />
      <Bar dataKey="overtime" fill="#F44336" stackId="a" />
      <Legend />
      <Tooltip content={renderTooltip} />
    </BarChart>
  );
}
