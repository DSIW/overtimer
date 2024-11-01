import React, { cloneElement, ReactElement, useRef } from "react";
import { useResizeObserver } from "usehooks-ts";

interface Props {
  children: ReactElement;
}

export default function DiagramContainer({ children }: Props) {
  const sizeRef = useRef(null);
  const { width } = useResizeObserver({
    ref: sizeRef,
    box: "content-box"
  });

  return (
    <div ref={sizeRef} style={{ width: "100%" }}>
      {cloneElement(children, { width })}
    </div>
  );
}
