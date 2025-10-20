import { createContext, useContext } from "react";
import { Bead } from "./bead";

interface BeadContextType {
  instance: Bead;
  setInstance: (instance: Bead) => void;
}

export const BeadContext = createContext<BeadContextType | undefined>(undefined);

export function useBeadModel() {
  const context = useContext(BeadContext);

  if (context === undefined) {
    throw new Error("useBeadModel must be used within a BeadProvider");
  }

  return context;
}
