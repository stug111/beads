import { describe, expect, it, vi } from "vitest";
import { createSignal } from "./signal";
import { createComputed } from "./computed";

describe("createComputed", () => {
  it("should call passed function if signal was changed", () => {
    const value = createSignal(10);
    const computedValue = createComputed(() => {
      return value();
    });

    expect(computedValue()).toBe(10);
    const fn = vi.fn();
    computedValue.subscribe(fn);
    value.set(20);
    expect(computedValue()).toBe(20);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(20);
  });

  it("should properly proceed nested computed calls", () => {
    const valueA = createSignal(10);
    const valueB = createSignal(5);

    const computedA = createComputed(() => valueA() + valueB());
    const computedB = createComputed(() => computedA() * 2);

    expect(computedB()).toBe(30);
  });
  it("should recompute only when dependencies change", () => {
    const idx = createSignal(0);
    const arraySignals = [createSignal(0), createSignal(0), createSignal(0)];

    let recompute = 0;

    const computedA = createComputed(() => {
      recompute++;
      return arraySignals[idx()]();
    });

    expect(computedA()).toBe(0);
    expect(recompute).toBe(1);

    recompute = 0;

    arraySignals[0].set(1);
    arraySignals[1].set(1);
    arraySignals[2].set(1);

    expect(recompute).toBe(1);
  });
});
