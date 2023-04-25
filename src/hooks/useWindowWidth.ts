import { useState, useEffect } from "react";

function useWindowWidth(): number {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);

      function handleResize(): void {
        setWidth(window.innerWidth);
      }

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return width;
}

export default useWindowWidth;
