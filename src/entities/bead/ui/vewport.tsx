import { useApplication } from "@pixi/react";
import type { Viewport as PixiViewport } from "pixi-viewport";
import { useEffect, useRef, type ReactNode } from "react";
import { mode } from "../model/store";

export function Viewport({ children }: { children: ReactNode }) {
  const ref = useRef<PixiViewport>(null);
  const { app } = useApplication();

  useEffect(() => {
    if (!ref.current) return;

    const viewport = ref.current;
    viewport.drag().pinch().wheel();

    if (mode() !== "drag") {
      const dragPlugin = viewport.plugins.get("drag");
      const pinchPlugin = viewport.plugins.get("pinch");

      dragPlugin?.pause();
      pinchPlugin?.pause();
    }

    const handleResize = () => {
      viewport.resize(app.renderer.width, app.renderer.height);
    };

    app.renderer.on("resize", handleResize);

    return () => {
      app.renderer.off("resize", handleResize);
    };
  }, [app]);

  useEffect(() => {
    const viewport = ref.current;
    if (!viewport) return;

    const unsubscribe = mode.subscribe((value) => {
      const dragPlugin = viewport.plugins.get("drag");
      const pinchPlugin = viewport.plugins.get("pinch");

      if (value === "drag") {
        dragPlugin?.resume();
        pinchPlugin?.resume();
      } else {
        dragPlugin?.pause();
        pinchPlugin?.pause();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <viewport ref={ref} events={app.renderer.events}>
      {children}
    </viewport>
  );
}
