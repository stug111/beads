import { describe, expect, it, vi } from "vitest";
import { createSignal } from "./signal";
import { createComputed } from "./computed";
import { createEffect } from "./effect";

describe("createComputed", () => {
  describe("get", () => {
    it("should return computed value", () => {
      const valueA = createSignal(10);
      const fnA = vi.fn(() => valueA() * 2);
      const computedValueA = createComputed(fnA);

      expect(computedValueA()).toBe(20);
      expect(fnA).toHaveBeenCalledTimes(1);
    });
    it("should recompute value when dependencies change", () => {
      const valueA = createSignal(10);
      const fnA = vi.fn(() => valueA() * 2);
      const computedValueA = createComputed(fnA);

      expect(computedValueA()).toBe(20);
      expect(fnA).toHaveBeenCalledTimes(1);

      valueA.set(20);

      expect(computedValueA()).toBe(40);
      expect(fnA).toHaveBeenCalledTimes(2);
    });
    it("should not recompute value when dependencies do not change", () => {
      const valueA = createSignal(10);
      const fnA = vi.fn(() => valueA() * 2);
      const computedValueA = createComputed(fnA);

      expect(computedValueA()).toBe(20);
      expect(fnA).toHaveBeenCalledTimes(1);

      valueA.set(10);

      expect(computedValueA()).toBe(20);
      expect(fnA).toHaveBeenCalledTimes(1);
    });
    it("should work with multiple dependencies", () => {
      const valueA = createSignal(10);
      const valueB = createSignal(5);
      const fnA = vi.fn(() => valueA() + valueB());
      const computedValueA = createComputed(fnA);

      expect(computedValueA()).toBe(15);
      expect(fnA).toHaveBeenCalledTimes(1);
    });
    it("should handle nested computed signals", () => {
      const valueA = createSignal(10);
      const computedValueA = createComputed(() => valueA() * 2);
      const computedValueB = createComputed(() => computedValueA() + 5);

      expect(computedValueB()).toBe(25);

      valueA.set(20);

      expect(computedValueB()).toBe(45);
    });
    it("should work inside effects", () => {
      const valueA = createSignal(10);
      const computedValueA = createComputed(() => valueA() * 2);

      const fnA = vi.fn(() => {
        return computedValueA();
      });

      createEffect(fnA);

      expect(fnA).toHaveBeenCalledTimes(1);
      expect(fnA).toHaveReturnedWith(20);

      valueA.set(15);

      expect(fnA).toHaveBeenCalledTimes(2);
      expect(fnA).toHaveReturnedWith(30);
    });
  });
  describe("subscribe", () => {
    it("should call subscribed function when computed value changes", () => {
      const valueA = createSignal(10);
      const computedValueA = createComputed(() => valueA() * 2);

      const fnA = vi.fn();
      computedValueA.subscribe(fnA);

      expect(fnA).toHaveBeenCalledTimes(0);

      valueA.set(20);

      expect(computedValueA()).toBe(40);
      expect(fnA).toHaveBeenCalledTimes(1);
      expect(fnA).toHaveBeenCalledWith(40);
    });
    it("should not call subscribed function when computed value does not change", () => {
      const valueA = createSignal(10);
      const computedValueA = createComputed(() => valueA() * 2);

      const fnA = vi.fn();
      computedValueA.subscribe(fnA);

      expect(fnA).toHaveBeenCalledTimes(0);

      valueA.set(10);

      expect(computedValueA()).toBe(20);
      expect(fnA).toHaveBeenCalledTimes(0);
    });
    it("should return unsubscribe function", () => {
      const valueA = createSignal(10);
      const computedValueA = createComputed(() => valueA() * 2);

      const fnA = vi.fn();
      const unsubscribe = computedValueA.subscribe(fnA);

      expect(fnA).toHaveBeenCalledTimes(0);

      valueA.set(20);

      expect(computedValueA()).toBe(40);
      expect(fnA).toHaveBeenCalledTimes(1);
      expect(fnA).toHaveBeenCalledWith(40);

      unsubscribe();

      valueA.set(30);

      expect(computedValueA()).toBe(60);
      expect(fnA).toHaveBeenCalledTimes(1);
    });
  });
  describe("unsubscribe", () => {
    it("should not call unsubscribed function when computed value changes", () => {
      const valueA = createSignal(10);
      const computedValueA = createComputed(() => valueA() * 2);

      const fnA = vi.fn();
      computedValueA.subscribe(fnA);

      expect(fnA).toHaveBeenCalledTimes(0);

      valueA.set(20);

      expect(computedValueA()).toBe(40);
      expect(fnA).toHaveBeenCalledTimes(1);
      expect(fnA).toHaveBeenCalledWith(40);

      fnA.mockClear();

      computedValueA.unsubscribe(fnA);

      valueA.set(30);

      expect(computedValueA()).toBe(60);
      expect(fnA).toHaveBeenCalledTimes(0);
    });
  });
  describe("destroy", () => {
    it("should not call any subscribed signals after destroy", () => {
      const valueA = createSignal(10);
      const computedValueA = createComputed(() => valueA() * 2);

      const fnA = vi.fn();
      computedValueA.subscribe(fnA);
      expect(fnA).toHaveBeenCalledTimes(0);

      valueA.set(20);
      expect(fnA).toHaveBeenCalledTimes(1);
      expect(fnA).toHaveBeenCalledWith(40);
      fnA.mockClear();

      computedValueA.destroy();

      valueA.set(30);
      expect(fnA).toHaveBeenCalledTimes(0);
    });
  });
});
