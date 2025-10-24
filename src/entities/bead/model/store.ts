import { useMemo, useSyncExternalStore } from "react";
import { events } from "../lib/event-emitter";

export type StoreState = {
  color: string;
  mode: "drag" | "draw" | "erase";
};

type StoreListener = (state: StoreState) => void;

function createBeadStore() {
  let state: StoreState = {
    color: "#000000",
    mode: "drag",
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
  };
}

const beadStore = createBeadStore();

export function getColor() {
  return beadStore.getSnapshot().color;
}

export function getMode() {
  return beadStore.getSnapshot().mode;
}

export const { changeColor, changeMode } = beadStore;

export function useBeadStore<T = StoreState>(selector: (state: StoreState) => T = (state) => state as T) {
  const getSnapshot = useMemo(() => () => selector(beadStore.getSnapshot()), [selector]);
  const store = useSyncExternalStore(beadStore.subscribe, getSnapshot);
  return store;
}
