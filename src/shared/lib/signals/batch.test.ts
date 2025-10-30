import { describe, expect, it, vi } from "vitest";
import { createSignal } from "./signal";
import { createComputed } from "./computed";
import { batch } from "./batch";

describe("batch", () => {
  it("should call subscriber once if multiple signals are changed inside batch", () => {
    const signalA = createSignal(1);
    const signalB = createSignal(2);
    const computedC = createComputed(() => {
      return signalA() + signalB();
    });

    const fn = vi.fn();
    computedC.subscribe(fn);

    batch(() => {
      signalA.set(3);
      signalB.set(4);
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(computedC()).toBe(7);
    fn.mockClear();
  });
  it("should call subscribe once for nested batches", () => {
    const signalA = createSignal(1);
    const signalB = createSignal(2);
    const computedC = createComputed(() => {
      return signalA() + signalB();
    });

    const fn = vi.fn();
    computedC.subscribe(fn);

    batch(() => {
      batch(() => {
        signalA.set(3);
        signalB.set(4);
      });

      batch(() => {
        signalA.set(5);
        signalB.set(5);
      });
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(computedC()).toBe(10);
    fn.mockClear();
  });
});
