import { useApplication } from "@pixi/react";
import type { Viewport as PixiViewport } from "pixi-viewport";
import { useEffect, useRef, type ReactNode } from "react";

export function Viewport({ children }: { children: ReactNode }) {
  const ref = useRef<PixiViewport>(null);
  const { app } = useApplication();

  useEffect(() => {
    if (!ref.current) return;

    const viewport = ref.current;

    viewport.drag().pinch().wheel();

    const handleResize = () => {
      viewport.resize(app.renderer.width, app.renderer.height);
    };

    app.renderer.on("resize", handleResize);

    return () => {
      app.renderer.off("resize", handleResize);
    };
  }, [app]);

  return (
    <viewport ref={ref} events={app.renderer.events}>
      {children}
    </viewport>
  );
}
