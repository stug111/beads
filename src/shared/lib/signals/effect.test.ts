import { describe, expect, it, vi } from "vitest";
import { createSignal } from "./signal";
import { createEffect } from "./effect";

describe("effect", () => {
  it("should call when signal was changed", () => {
    const signalA = createSignal(1);
    const fn = vi.fn(() => signalA());
    createEffect(fn);

    expect(fn).toHaveBeenCalledTimes(1);

    signalA.set(2);
    expect(fn).toHaveBeenCalledTimes(2);
  });
  it("should call when multiple signals were changed", () => {
    const signalA = createSignal(1);
    const signalB = createSignal(2);
    const fn = vi.fn(() => signalA() + signalB());
    createEffect(fn);

    expect(fn).toHaveBeenCalledTimes(1);

    signalA.set(3);
    expect(fn).toHaveBeenCalledTimes(2);
  });
  it("should handle multiple effects", () => {
    const signalA = createSignal(1);
    const fn1 = vi.fn(() => signalA());
    const fn2 = vi.fn(() => signalA() * 2);
    createEffect(fn1);
    createEffect(fn2);

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);

    signalA.set(2);
    expect(fn1).toHaveBeenCalledTimes(2);
    expect(fn2).toHaveBeenCalledTimes(2);
  });
  it("should unsubscribe from signal when effect is destroyed", () => {
    const signalA = createSignal(1);
    const fn = vi.fn(() => signalA());
    const destroy = createEffect(fn);

    expect(fn).toHaveBeenCalledTimes(1);

    destroy();

    signalA.set(2);
    expect(fn).toHaveBeenCalledTimes(1);
  });
  it("should not create infinite loop when signal set to same value inside effect", () => {
    const signalA = createSignal(0);

    createEffect(() => {
      signalA.set(signalA());
    });

    expect(signalA()).toBe(0);
  });
  it("should not create infinite loop when recursive effects", () => {
    const signalA = createSignal(1);
    const signalB = createSignal(0);

    const fnA = vi.fn(() => {
      signalB.set(signalA());
    });

    const fnB = vi.fn(() => {
      signalA.set(signalB());
    });

    createEffect(fnA);
    createEffect(fnB);

    expect(signalA()).toBe(1);
    expect(signalB()).toBe(1);
    expect(fnA).toHaveBeenCalledTimes(1);
    expect(fnB).toHaveBeenCalledTimes(1);

    signalB.set(2);

    expect(signalA()).toBe(2);
    expect(signalB()).toBe(2);
    expect(fnA).toHaveBeenCalledTimes(2);
    expect(fnB).toHaveBeenCalledTimes(2);
  });
  it("should discover new branches while running automatically", () => {
    const signalA = createSignal(0);
    const signalB = createSignal(2);

    const fnA = vi.fn();
    const fnB = vi.fn();

    createEffect(() => {
      if (signalA() < 1) {
        fnA();
      } else if (signalB() > 5) {
        fnB();
      }
    });

    expect(fnA).toHaveBeenCalledTimes(1);
    expect(fnB).toHaveBeenCalledTimes(0);

    signalA.set(2);
    expect(fnA).toHaveBeenCalledTimes(1);
    expect(fnB).toHaveBeenCalledTimes(0);

    signalB.set(6);
    expect(fnA).toHaveBeenCalledTimes(1);
    expect(fnB).toHaveBeenCalledTimes(1);
  });
  it("should call effect when signal update inside effect with recursion", () => {
    const signalA = createSignal(1);
    const fnA = vi.fn(() => {
      const value = signalA();
      if (value < 3) {
        signalA.set(value + 1);
      }
    });

    createEffect(fnA);

    expect(signalA()).toBe(3);
    expect(fnA).toHaveBeenCalledTimes(3);
  });
});
