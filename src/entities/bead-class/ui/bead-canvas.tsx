import { useEffect, useRef } from "react";
import { BeadApplication } from "../engine/bead-application";
import { ColorPicker } from "./color-picker";
import { ChangerMode } from "./changer-mode";

export function BeadCanvas() {
  const mount = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mount.current) {
      async function setup() {
        if (!ref.current) return;

        const beadApplication = new BeadApplication(ref.current);
        await beadApplication.init({ backgroundColor: "#ffffff" });
      }

      setup();
    }

    return () => {
      mount.current = true;
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <div ref={ref} className="w-full min-h-dvh overflow-hidden" />
      <ColorPicker />
      <ChangerMode />
    </div>
  );
}
