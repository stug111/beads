import { events } from "../lib/event-emitter";

export type StoreState = {
  color: string;
  mode: "drag" | "draw" | "erase";
};

type StoreListener = (state: StoreState) => void;

function createBeadStore() {
  const state: StoreState = {
    color: "#000000",
    mode: "drag",
  };
  const listeners = new Set<StoreListener>();

  events.on("changeColor", (payload) => {
    state.color = payload.color;
    listeners.forEach((listener) => listener(state));
  });

  events.on("changeMode", (payload) => {
    state.mode = payload.mode;
    listeners.forEach((listener) => listener(state));
  });

  return {
    getSnapshot: () => state,
    subscribe: (listener: StoreListener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
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
