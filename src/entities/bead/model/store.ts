import { Application, Sprite, Texture } from "pixi.js";
import { createBeadCellId, parseBeadCellId, type BeadCellId } from "../lib/bead-cell-id";
import { createEffect, createSignal } from "../../../shared/lib";
import type { Template } from "../../../shared/config/db/schema";
import { db } from "../../../shared/config";

export type Cell = {
  color: string;
};

export const application = createSignal<Application | undefined>(undefined);
export const color = createSignal<string>("#000000");
export const mode = createSignal<"drag" | "draw" | "erase" | "select">("drag");
export const template = createSignal<Map<BeadCellId, Cell>>(new Map());
export const rows = createSignal<number>(10);
export const columns = createSignal<number>(30);
export const colorPalette = createSignal<Set<string>>(new Set(["#cdb4db", "#ffc8dd", "#ffafcc", "#bde0fe", "#a2d2ff"]));
export const gridTexture = createSignal<Texture>(Texture.EMPTY);
export const showMirror = createSignal<boolean>(false);
export const isClearPalette = createSignal<boolean>(false);
export const isNewPalette = createSignal<boolean>(false);
export const cells = createSignal<Map<BeadCellId, Sprite>>(new Map());
export const selectedCells = createSignal<Set<BeadCellId>>(new Set());
export const templates = createSignal<Template[]>([]);

createEffect(async () => {
  await db.query.templates.findMany().then((data) => {
    templates.set(data);
  });
});

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

export function addToTemplate(color: string, x: number, y: number) {
  const cellId = createBeadCellId(x, y);
  const currentPalette = template();

  if (currentPalette.has(cellId) && currentPalette.get(cellId)?.color === color) return;

  currentPalette.set(cellId, { color });
  template.set(currentPalette);
}

export function removeFromTemplate(x: number, y: number) {
  const cellId = createBeadCellId(x, y);
  const currentPalette = template();

  if (!currentPalette.has(cellId)) return;

  currentPalette.delete(cellId);
  template.set(currentPalette);
}

export function setSelectedCells(cellIds: Set<BeadCellId>) {
  selectedCells.set(cellIds);
}

export function clearSelectedCells() {
  selectedCells.set(new Set());
}

export function clearOutOfBoundsCells(maxRows: number, maxCols: number) {
  const currentTemplate = template();
  const cellsToDelete: BeadCellId[] = [];

  currentTemplate.forEach((_, cellId) => {
    const [row, col] = parseBeadCellId(cellId);
    if (row >= maxRows || col >= maxCols) {
      cellsToDelete.push(cellId);
    }
  });

  cellsToDelete.forEach((cellId) => {
    currentTemplate.delete(cellId);
  });

  if (cellsToDelete.length > 0) {
    template.set(currentTemplate);
  }
}
