import { useEffect, useState } from "react";

interface WindowSizeResult {
  width: number;
  height: number;
}

export const useWindowSize = (): WindowSizeResult => {
  const [windowSize, setWindowSize] = useState<WindowSizeResult>({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
