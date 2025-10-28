import { createSignal, type Signal, type SignalListener, type SignalOptions } from "./signal";
import { activeContext } from "./context";

export interface ComputedSignal<T> {
  (): T;
  deps: Set<Signal<any>>;
  compute: () => T;
  update: () => void;
  subscribe: (listener: SignalListener<T>) => () => void;
  unsubscribe: (listener: SignalListener<T>) => void;
  destroy: () => void;
}

export function createComputed<T>(
  fn: () => T,
  options?: SignalOptions<T>
): Omit<ComputedSignal<T>, "compute" | "update"> {
  let _signal: Signal<T>;

  function signal(): Signal<T> {
    return _signal || (_signal = createSignal(result.compute(), options));
  }

  const result: ComputedSignal<T> = Object.assign(
    function get(): T {
      return signal()();
    },
    {
      update: () => {
        signal().set(result.compute());
      },
      compute: () => {
        [...result.deps].forEach((dep) => {
          dep.unsubscribe(result.update);
        });
        result.deps.clear();

        let newValue: T;
        activeContext.push(new Set<ComputedSignal<any>>([result]));

        try {
          newValue = fn();
        } finally {
          activeContext.pop();
        }

        return newValue;
      },
      subscribe: (listener: SignalListener<T>) => {
        signal().subscribe(listener);

        return () => {
          signal().unsubscribe(listener);
        };
      },
      unsubscribe: (listener: SignalListener<T>) => {
        signal().unsubscribe(listener);
        result.deps.delete(signal());
      },
      destroy: () => {
        signal().destroy();
        result.deps.clear();
      },
      deps: new Set<Signal<any>>(),
    }
  );

  return result;
}
