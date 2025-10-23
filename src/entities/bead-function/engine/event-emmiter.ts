export function createEventEmitter<TEvents extends { [K in keyof TEvents]: unknown[] }>() {
  const listeners: Partial<{ [K in keyof TEvents]: Array<(...args: TEvents[K]) => void> }> = {};

  return {
    on<K extends keyof TEvents>(eventName: K, listener: (...args: TEvents[K]) => void) {
      if (!listeners[eventName]) {
        listeners[eventName] = [];
      }
      listeners[eventName]!.push(listener);
    },
    off<K extends keyof TEvents>(eventName: K, listener: (...args: TEvents[K]) => void) {
      if (!listeners[eventName]) return;
      listeners[eventName] = listeners[eventName]!.filter((l) => l !== listener);
    },
    emit<K extends keyof TEvents>(eventName: K, ...args: TEvents[K]) {
      if (!listeners[eventName]) return;
      for (const listener of listeners[eventName]!) {
        listener(...args);
      }
    },
  };
}

export type Events = {
  colorChange: [color: string];
};

export const events = createEventEmitter<Events>();
