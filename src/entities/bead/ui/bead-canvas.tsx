import { useEffect, useRef } from "react";
import { Bead } from "../model/bead";
import { useBeadModel } from "../model/use-bead-model";
import { ColorPicker } from "./color-picker";

export function BeadCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  const mount = useRef<boolean>(false);
  const { setInstance } = useBeadModel();

  useEffect(() => {
    if (ref.current && !mount.current) {
      const newBead = new Bead(ref.current);
      setInstance(newBead);
    }

    return () => {
      mount.current = true;
    };
  }, []);

  return (
    <div className="w-full min-h-dvh overflow-hidden" ref={ref}>
      <ColorPicker />
    </div>
  );
}
