import { Application, Sprite, Texture } from "pixi.js";
import { createBeadCellId, type BeadCellId } from "../lib/bead-cell-id";
import { createSignal } from "../lib/signals";

export type Cell = {
  color: string;
};

export const application = createSignal<Application | undefined>(undefined);
export const color = createSignal<string>("#000000");
export const mode = createSignal<"drag" | "draw" | "erase" | "select">("drag");
export const palette = createSignal<Map<BeadCellId, Cell>>(new Map());
export const rows = createSignal<number>(10);
export const columns = createSignal<number>(30);
export const colorPalette = createSignal<Set<string>>(new Set(["#cdb4db", "#ffc8dd", "#ffafcc", "#bde0fe", "#a2d2ff"]));
export const gridTexture = createSignal<Texture>(Texture.EMPTY);
export const showMirror = createSignal<boolean>(false);
export const isClearPalette = createSignal<boolean>(false);
export const cells = createSignal<Map<BeadCellId, Sprite>>(new Map());
export const selectedCells = createSignal<Set<BeadCellId>>(new Set());

export function addCell(cellId: BeadCellId, sprite: Sprite) {
  const currentCells = cells();
  currentCells.set(cellId, sprite);
  cells.set(currentCells);
}

export function removeCell(cellId: BeadCellId) {
  const currentCells = cells();
  if (!currentCells.has(cellId)) return;
  currentCells.delete(cellId);
  cells.set(currentCells);
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

export function setSelectedCells(cellIds: Set<BeadCellId>) {
  selectedCells.set(cellIds);
}

export function clearSelectedCells() {
  selectedCells.set(new Set());
}
