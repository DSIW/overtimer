import React, { ReactElement, ReactNode } from "react";
import { TooltipProps } from "recharts";

interface Props extends TooltipProps<number, string> {
  payload?: Array<{
    payload?: ReactNode;
    [key: string]: unknown;
  }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (data: any) => ReactNode;
}
export default function OvertimerTooltip(props: Props): ReactElement {
  const { active, payload, children } = props;

  if (active && payload && payload.length) {
    const data = payload[0] && payload[0].payload;

    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #999",
          margin: 0,
          padding: 10,
        }}
      >
        {children(data)}
      </div>
    );
  }

  return <></>;
}
