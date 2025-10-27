import { runInBatch } from "./batch";
import { collectSignal } from "./computed";

export type SubscribeListenerFn<T> = (current: T) => void;

export interface Signal<T> {
  (): T;
  set: (newValue: T) => void;
  subscribe: (listener: SubscribeListenerFn<T>) => () => void;
  unsubscribe: (listener: SubscribeListenerFn<T>) => void;
  destroy: () => void;
}

export interface SignalOptions<T> {
  equals?: (current: T, next: T) => boolean;
}

export function createSignal<T>(initialValue: T, options: SignalOptions<T> = {}): Signal<T> {
  const listeners = new Set<SubscribeListenerFn<T>>();
  let value = initialValue;

  const equals = options.equals || Object.is;

  function set(newValue: T) {
    if (equals(value, newValue)) return;

    value = newValue;

    runInBatch(result, () => {
      listeners.forEach((listener) => {
        listener(newValue);
      });
    });
  }

  function unsubscribe(listener: SubscribeListenerFn<T>) {
    listeners.delete(listener);
  }

  function subscribe(listener: SubscribeListenerFn<T>) {
    listeners.add(listener);

    return () => {
      unsubscribe(listener);
    };
  }

  function destroy() {
    listeners.clear();
  }

  const result = Object.assign(
    function get(): T {
      collectSignal(result);
      return value;
    },
    {
      set,
      subscribe,
      unsubscribe,
      destroy,
    }
  );

  return result;
}
