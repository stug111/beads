import { useApplication } from "@pixi/react";
import type { Viewport as PixiViewport } from "pixi-viewport";
import { useEffect, useRef, type ReactNode } from "react";
import { events } from "../lib/event-emitter";
import { getMode } from "../model/store";

export function Viewport({ children }: { children: ReactNode }) {
  const ref = useRef<PixiViewport>(null);
  const { app } = useApplication();

  useEffect(() => {
    if (!ref.current) return;

    const viewport = ref.current;
    viewport.drag().pinch().wheel();

    if (getMode() !== "drag") {
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

    const handleChangeMode = (payload: { mode: "drag" | "draw" | "erase" }) => {
      const dragPlugin = viewport.plugins.get("drag");
      const pinchPlugin = viewport.plugins.get("pinch");

      if (payload.mode === "drag") {
        dragPlugin?.resume();
        pinchPlugin?.resume();
      } else {
        dragPlugin?.pause();
        pinchPlugin?.pause();
      }
    };

    events.on("changeMode", handleChangeMode);

    return () => {
      events.off("changeMode", handleChangeMode);
    };
  }, []);

  return (
    <viewport ref={ref} events={app.renderer.events}>
      {children}
    </viewport>
  );
}
