import type { StoreState } from "../model/old-store";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EventListener<T = any> = (payload: T) => void;

function createEventEmitter<TEvents extends Record<string, unknown>>() {
  let listeners: Map<keyof TEvents, Set<EventListener>> = new Map();

  return {
    on<Event extends keyof TEvents>(eventName: Event, listener: EventListener<TEvents[Event]>) {
      if (!listeners.has(eventName)) {
        listeners.set(eventName, new Set());
      }

      listeners.get(eventName)?.add(listener);
    },
    off<Event extends keyof TEvents>(eventName: Event, listener: EventListener<TEvents[Event]>) {
      if (listeners.has(eventName)) {
        listeners.get(eventName)?.delete(listener);
      }
    },
    emit<K extends keyof TEvents>(eventName: K, payload: TEvents[K]) {
      const eventListeners = listeners.get(eventName);
      if (!eventListeners) return;
      eventListeners.forEach((listener) => {
        listener(payload);
      });
    },
    clear<K extends keyof TEvents>(eventName?: K) {
      if (eventName) {
        listeners.set(eventName, new Set());
      } else {
        listeners = new Map();
      }
    },
  };
}

type BeadEventMap = {
  changeColor: { color: StoreState["color"] };
  changeMode: { mode: StoreState["mode"] };
  addToPalette: { color: string; x: number; y: number };
  removeFromPalette: { x: number; y: number };
};

export const events = createEventEmitter<BeadEventMap>();
