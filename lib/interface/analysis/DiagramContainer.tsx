import React, {
  cloneElement,
  ReactElement,
  useRef,
  useState,
  useEffect,
} from "react";

interface Props {
  children: ReactElement<{ width?: number }>;
}

export default function DiagramContainer({ children }: Props) {
  const sizeRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!sizeRef.current) return;

    const updateWidth = () => {
      if (sizeRef.current) {
        setWidth(sizeRef.current.getBoundingClientRect().width);
      }
    };

    // Initial width calculation
    updateWidth();

    // Set up resize observer
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(sizeRef.current);

    // Clean up
    return () => {
      if (sizeRef.current) {
        resizeObserver.unobserve(sizeRef.current);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={sizeRef} style={{ width: "100%" }}>
      {cloneElement(children, { width })}
    </div>
  );
}
