import { createSignal, type Signal, type SignalOptions, type SubscribeListenerFn } from "./signal";

const contextSignals: Set<Signal<unknown>>[] = [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function collectSignal(signal: Signal<any>) {
  const currentContext = contextSignals[contextSignals.length - 1];

  if (currentContext) {
    currentContext.add(signal);
  }
}

export function createComputed<T>(fn: () => T, options: SignalOptions<T> = {}) {
  let _signal: Signal<T> | undefined;
  let _deps = new Map<Signal<unknown>, () => void>();

  function signal(): Signal<T> {
    return _signal ?? (_signal = createSignal<T>(compute(), options));
  }

  function update() {
    signal().set(compute());
  }

  function compute(): T {
    const collectionSignals = new Set<Signal<unknown>>();
    let result: T;

    contextSignals.push(collectionSignals);

    try {
      result = fn();
    } finally {
      contextSignals.pop();
    }

    const nextDeps = new Map<Signal<unknown>, () => void>();

    collectionSignals.forEach((dep) => {
      if (_deps.has(dep)) {
        nextDeps.set(dep, _deps.get(dep)!);
      } else {
        const unsubscribe = dep.subscribe(update);
        nextDeps.set(dep, unsubscribe);
      }
    });

    _deps.forEach((unsubscribe, dep) => {
      if (!nextDeps.has(dep)) {
        unsubscribe();
      }
    });

    _deps = nextDeps;

    return result;
  }

  function subscribe(listener: SubscribeListenerFn<T>) {
    return signal().subscribe(listener);
  }

  function destroy() {
    _deps.forEach((unsubscribe) => {
      unsubscribe();
    });
    _deps.clear();
    _signal?.destroy();
  }

  const result = Object.assign(
    function computed(): T {
      return signal()();
    },
    {
      subscribe,
      destroy,
    }
  );

  return result;
}
