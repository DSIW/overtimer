import React, { cloneElement, ReactElement } from "react";
import { useElementSize } from "usehooks-ts";

interface Props {
  children: ReactElement;
}

export default function DiagramContainer({ children }: Props) {
  const [sizeRef, { width }] = useElementSize();

  return (
    <div ref={sizeRef} style={{ width: "100%" }}>
      {cloneElement(children, { width })}
    </div>
  );
}
