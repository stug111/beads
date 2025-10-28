import { createBeadCellId, type BeadCellId } from "../lib/bead-cell-id";
import { createSignal } from "../lib/signals";

export type Cell = {
  color: string;
};

export const color = createSignal<string>("#000000");
export const mode = createSignal<"drag" | "draw" | "erase">("drag");
export const palette = createSignal<Map<BeadCellId, Cell>>(new Map());
export const rows = createSignal<number>(10);
export const columns = createSignal<number>(30);
export const colorPalette = createSignal<Set<string>>(new Set(["#cdb4db", "#ffc8dd", "#ffafcc", "#bde0fe", "#a2d2ff"]));

export function changeColor(newColor: string) {
  color.set(newColor);
}

export function changeMode(newMode: "drag" | "draw" | "erase") {
  mode.set(newMode);
}

export function changeRows(newRows: number) {
  rows.set(newRows);
}

export function changeColumns(newColumns: number) {
  columns.set(newColumns);
}

export function addColorToPalette(newColor: string) {
  const currentPalette = colorPalette();
  if (currentPalette.has(newColor)) return;

  currentPalette.add(newColor);
  colorPalette.set(currentPalette);
}

export function removeColorFromPalette(color: string) {
  const currentPalette = colorPalette();
  if (!currentPalette.has(color)) return;

  currentPalette.delete(color);
  colorPalette.set(currentPalette);
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
