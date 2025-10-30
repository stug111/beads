import type { Signal } from "./signal";

let batchContext: Map<Signal<unknown>, () => void> | undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function runInBatch(signal: Signal<any>, callback: () => void) {
  if (batchContext) {
    batchContext.set(signal, callback);
  } else {
    callback();
  }
}

export function batch(fn: () => void): void {
  if (batchContext) {
    return fn();
  }

  batchContext = new Map();

  try {
    fn();
  } finally {
    batchContext.forEach((callback) => {
      callback();
    });
    batchContext = undefined;
  }
}
