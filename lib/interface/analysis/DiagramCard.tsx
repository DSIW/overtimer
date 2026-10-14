import React, { ReactElement } from "react";
import DiagramContainer from "./DiagramContainer";

interface Props {
  title: string;
  children: ReactElement<{ width?: number }>;
}

export default function DiagramCard({ title, children }: Props) {
  return (
    <div className="w-full rounded-lg border border-border-primary bg-surface-primary p-4 shadow-card">
      <h2 className="mb-8 text-lg font-light uppercase text-content-secondary">
        {title}
      </h2>
      <DiagramContainer>{children}</DiagramContainer>
    </div>
  );
}
