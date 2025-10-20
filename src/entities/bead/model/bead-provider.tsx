import { useState, type ReactNode } from "react";
import { BeadContext } from "./use-bead-model";
import type { Bead } from "./bead";

export function BeadProvider({ children }: { children: ReactNode }) {
  const [instance, setInstance] = useState<Bead>();

  return <BeadContext.Provider value={{ instance, setInstance }}>{children}</BeadContext.Provider>;
}
