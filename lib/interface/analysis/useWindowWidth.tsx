import { useEffect, useState } from "react";

export default function useWindowWidth(): number {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return width;
}
