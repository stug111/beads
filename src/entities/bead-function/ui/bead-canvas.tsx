import { useEffect, useRef } from "react";
import { initialBoard } from "../engine/initial-board";
import { ColorPicker } from "./color-picker";

export function BeadCanvas() {
  const mount = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mount.current) {
      async function setup() {
        if (!ref.current) return;
        const app = await initialBoard({ resizeTo: ref.current });
        ref.current.appendChild(app.canvas);
      }

      setup();
    }

    return () => {
      mount.current = true;
    };
  }, []);

  return (
    <div ref={ref} className="w-full min-h-dvh overflow-hidden">
      <ColorPicker />
    </div>
  );
}
