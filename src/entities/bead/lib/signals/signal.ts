import { runInBatch } from "./batch";
import { addDependencies } from "./context";

export interface Signal<T> {
  (): T;
  set: (newValue: T) => void;
  subscribe: (listener: SignalListener<T>) => () => void;
  unsubscribe: (listener: SignalListener<T>) => void;
  destroy: () => void;
}

export type SignalListener<T> = (newValue: T) => void;

export interface SignalOptions<T> {
  equals?: (a: T, b: T) => boolean;
}

export function createSignal<T>(initialValue: T, options?: SignalOptions<T>): Signal<T> {
  let value = initialValue;
  const equalsFn = options?.equals ?? Object.is;
  const deps = new Set<SignalListener<T>>();

  const result = Object.assign(
    function get(): T {
      addDependencies(result);
      return value;
    },
    {
      set: (newValue: T): void => {
        if (equalsFn(value, newValue)) return;

        value = newValue;

        runInBatch(result, () => {
          [...deps].forEach((listener) => {
            listener(newValue);
          });
        });
      },

      subscribe: (listener: SignalListener<T>): (() => void) => {
        deps.add(listener);

        return () => {
          deps.delete(listener);
        };
      },

      unsubscribe: (listener: SignalListener<T>): void => {
        deps.delete(listener);
      },

      destroy: (): void => {
        deps.clear();
      },
    }
  );

  return result;
}
