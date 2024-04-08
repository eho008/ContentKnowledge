import { useLayoutEffect, useState } from "react";

export function useWindowSize() {
  const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  const numCols = Math.floor((size * 0.75) / 260);
  return numCols;
}
