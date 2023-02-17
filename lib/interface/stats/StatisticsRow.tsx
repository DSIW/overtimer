import React, { PropsWithChildren } from "react";
import TimeLog from "../../domain/TimeLog";

export default function StatisticsRow({ children }: PropsWithChildren<{}>) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        margin: "2rem",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}
