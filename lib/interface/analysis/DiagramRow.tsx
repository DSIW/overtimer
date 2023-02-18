import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function DiagramRow({ children }: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        margin: "2rem",
        marginRight: 0,
        marginLeft: 0,
        width: "100%",
        flexDirection: "column",
        background: "white",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      {children}
    </div>
  );
}
