import { describe, expect, it, vi } from "vitest";
import { createSignal } from "./signal";

describe.only("createSignal", () => {
  describe("get", () => {
    it("should return signal value", () => {
      const value = createSignal(10);
      expect(value()).toBe(10);
    });
  });
  describe("set", () => {
    it("should update signal value", () => {
      const value = createSignal(10);
      expect(value()).toBe(10);
      value.set(20);
      expect(value()).toBe(20);
    });

    it("should not update signal value if equals function returns true", () => {
      const value = createSignal(10, {
        equals: (a, b) => a * 2 === b,
      });
      expect(value()).toBe(10);
      value.set(20);
      expect(value()).toBe(10);
    });
  });
  describe("subscribe", () => {
    it("should call subscribed signal if values was changes", () => {
      const value = createSignal(10);
      const listener = vi.fn();
      value.subscribe(listener);
      value.set(20);
      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith(20);
    });

    it("should not call subscribed signal if value was set to the same", () => {
      const value = createSignal(10);
      const listener = vi.fn();
      value.subscribe(listener);
      value.set(10);
      expect(listener).toHaveBeenCalledTimes(0);
    });
    it("should return unsubscribe function", () => {
      const value = createSignal(10);
      const listener = vi.fn();
      const unsubscribe = value.subscribe(listener);
      value.set(20);
      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith(20);
      unsubscribe();
      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith(20);
      listener.mockClear();
    });
  });
  describe("unsubscribe", () => {
    it("should not call unsubscribed signal if values was changes", () => {
      const value = createSignal(10);
      const listener = vi.fn();
      value.subscribe(listener);
      value.set(20);
      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith(20);
      listener.mockClear();

      value.unsubscribe(listener);
      value.set(30);
      expect(listener).toHaveBeenCalledTimes(0);
    });
  });
  describe("destroy", () => {
    it("should not call any subscribed signals after destroy", () => {
      const value = createSignal(10);
      const listener = vi.fn();
      value.subscribe(listener);
      value.set(20);
      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith(20);
      listener.mockClear();

      value.destroy();
      value.set(30);
      expect(listener).toHaveBeenCalledTimes(0);
    });
  });
});
