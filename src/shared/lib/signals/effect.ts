import type { Signal } from "./signal";
import { activeContext } from "./context";

export interface EffectListener {
  (): void;
  deps: Set<Signal<any>>;
}

export function createEffect(fn: () => void) {
  const effect = Object.assign(
    function run() {
      effect.deps.forEach((dep) => {
        dep.unsubscribe(effect);
      });
      effect.deps.clear();

      activeContext.push(new Set<EffectListener>([effect]));

      try {
        fn();
      } finally {
        activeContext.pop();
      }
    },
    {
      deps: new Set<Signal<any>>(),
    }
  );

  effect();

  return () => {
    effect.deps.forEach((dep) => {
      dep.unsubscribe(effect);
    });
    effect.deps.clear();
  };
}
