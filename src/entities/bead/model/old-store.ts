import { useMemo, useSyncExternalStore } from "react";
import { events } from "../lib/event-emitter";
import { createBeadCellId, type BeadCellId } from "../lib/bead-cell-id";

export type Cell = {
  color: string;
};

export type StoreState = {
  color: string;
  mode: "drag" | "draw" | "erase";
  palette: Map<BeadCellId, Cell>;
};

type StoreListener = (state: StoreState) => void;

function createBeadStore() {
  let state: StoreState = {
    color: "#000000",
    mode: "drag",
    palette: new Map(),
  };
  const listeners = new Set<StoreListener>();

  return {
    getSnapshot: () => state,
    subscribe: (listener: StoreListener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    changeColor: (color: StoreState["color"]) => {
      state = { ...state, color };
      events.emit("changeColor", { color });
      listeners.forEach((listener) => listener(state));
    },
    changeMode: (mode: StoreState["mode"]) => {
      state = { ...state, mode };
      events.emit("changeMode", { mode });
      listeners.forEach((listener) => listener(state));
    },
    addToPalette: (color: string, x: number, y: number) => {
      const cellId = createBeadCellId(y, x);

      if (state.palette.has(cellId) && state.palette.get(cellId)?.color === color) return;

      state = { ...state, palette: state.palette.set(cellId, { color }) };
      events.emit("addToPalette", { color, x, y });
      listeners.forEach((listener) => listener(state));
    },
    removeFromPalette: (x: number, y: number) => {
      const cellId = createBeadCellId(y, x);

      if (!state.palette.has(cellId)) return;

      state.palette.delete(cellId);
      state = { ...state, palette: state.palette };
      events.emit("removeFromPalette", { x, y });
      listeners.forEach((listener) => listener(state));
    },
  };
}

const beadStore = createBeadStore();

export function getColor() {
  return beadStore.getSnapshot().color;
}

export function getMode() {
  return beadStore.getSnapshot().mode;
}

export const { changeColor, changeMode, addToPalette, removeFromPalette } = beadStore;

export function useBeadStore<T = StoreState>(selector: (state: StoreState) => T = (state) => state as T) {
  const getSnapshot = useMemo(() => () => selector(beadStore.getSnapshot()), [selector]);
  const store = useSyncExternalStore(beadStore.subscribe, getSnapshot);
  return store;
}
