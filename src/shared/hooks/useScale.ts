import { useCallback, useEffect, useState } from "react";
import { useWindowSize } from "./useWindowSize";

export const useScale = (element: HTMLElement | null) => {
  const [scale] = useState(1);
  const { width: documentWidth } = useWindowSize();

  const handleScale = useCallback(() => {
    if (element) {
      console.log({ documentWidth, elementWidth: element.offsetWidth });
      //   const width = element.offsetWidth;
      //   console.log(documentWidth, width);
      //   if (documentWidth < width) {
      //     setScale(documentWidth / width);
      //   }
    }
  }, [documentWidth, element]);

  useEffect(() => {
    handleScale();
    window.addEventListener("resize", handleScale);

    return () => window.removeEventListener("resize", handleScale);
  }, [handleScale]);

  return scale;
};
