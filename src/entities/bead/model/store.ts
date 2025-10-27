import { createBeadCellId, type BeadCellId } from "../lib/bead-cell-id";
import { createSignal } from "../lib/signals";

export type Cell = {
  color: string;
};

export const color = createSignal<string>("#000000");
export const mode = createSignal<"drag" | "draw" | "erase">("drag");
export const palette = createSignal<Map<BeadCellId, Cell>>(new Map());

export function changeColor(newColor: string) {
  color.set(newColor);
}

export function changeMode(newMode: "drag" | "draw" | "erase") {
  mode.set(newMode);
}

export function addToPalette(color: string, x: number, y: number) {
  const cellId = createBeadCellId(x, y);
  const currentPalette = palette();

  if (currentPalette.has(cellId) && currentPalette.get(cellId)?.color === color) return;

  currentPalette.set(cellId, { color });
  palette.set(currentPalette);
}

export function removeFromPalette(x: number, y: number) {
  const cellId = createBeadCellId(x, y);
  const currentPalette = palette();

  if (!currentPalette.has(cellId)) return;

  currentPalette.delete(cellId);
  palette.set(currentPalette);
}
