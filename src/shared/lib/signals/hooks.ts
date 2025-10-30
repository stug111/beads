import { useSyncExternalStore } from "react";
import type { Signal } from "./signal";

export function useSignal<T>(signal: Signal<T>) {
  return useSyncExternalStore((onStoreChange) => signal.subscribe(onStoreChange), signal);
}
