import React from "react";
import Children from "../layout/Children";

export default function StatisticsRow({ children }: Children) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        margin: "2rem",
        marginRight: 0,
        marginLeft: 0,
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}
