import type { ComputedSignal } from "./computed";
import type { EffectListener } from "./effect";
import type { Signal } from "./signal";

export const activeContext: Set<EffectListener | ComputedSignal<any>>[] = [];

export function addDependencies<T>(signal: Signal<T>) {
  const currentContext = activeContext[activeContext.length - 1];
  if (!currentContext || currentContext.size === 0) return;

  currentContext.forEach((ctx) => {
    if ("update" in ctx) {
      ctx.deps.add(signal);
      signal.subscribe(ctx.update);
    } else {
      ctx.deps.add(signal);
      signal.subscribe(ctx);
    }
  });
}
