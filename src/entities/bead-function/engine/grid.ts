import { Container, Point, Sprite, Texture } from "pixi.js";
import type { BeadApplication } from "./bead-application";
import { beadHeight, beadWidth, cols, rows } from "../config/config";
import { createBeadCellId, type BeadCellId } from "../lib/bead-cell-id";
import { events } from "./event-emmiter";
import { createAxis } from "./axis";
import { getViewport } from "./viewport";

export function createGrid(app: BeadApplication) {
  const viewport = getViewport();
  const cells: Map<string, Sprite> = new Map();
  let isDrawing = false;
  let color = "#000000";

  const layoutContainer = new Container();
  const beadsContainer = new Container({
    label: "Beads Container",
    eventMode: "static",
    x: 40,
    y: 40,
    onpointerdown: (e) => {
      isDrawing = true;
      handleDraw(beadsContainer.toLocal(e.global));
    },
    onpointermove: (e) => {
      if (!isDrawing) return;
      handleDraw(beadsContainer.toLocal(e.global));
    },
    onpointerup: () => {
      isDrawing = false;
    },
  });

  events.on("colorChange", (newColor) => {
    color = newColor;
  });

  function getCellIdFromPointer(point: Point): BeadCellId | null {
    const row = Math.floor(point.y / beadHeight);
    const rowOffset = row % 2 === 1 ? beadWidth / 2 : 0;
    const col = Math.floor((point.x - rowOffset) / beadWidth);

    if (col < 0 || col >= cols || row < 0 || row >= rows) {
      return null;
    }

    return createBeadCellId(row, col);
  }

  function handleDraw(point: Point) {
    const cellId = getCellIdFromPointer(point);
    if (cellId === null) return;

    const bead = cells.get(cellId);

    if (!bead) return;

    bead.tint = color;
  }

  function drawGridBeads() {
    for (let row = 0; row < rows; row++) {
      const rowOffset = row % 2 === 1 ? beadWidth / 2 : 0;

      for (let col = 0; col < cols; col++) {
        const cellId: BeadCellId = createBeadCellId(row, col);
        const bead = new Sprite({
          texture: Texture.from("bead.png"),
          x: col * beadWidth + rowOffset,
          y: row * beadHeight,
          width: beadWidth,
          height: beadHeight,
        });

        cells.set(cellId, bead);
        beadsContainer.addChild(bead);
      }
    }
  }

  drawGridBeads();

  layoutContainer.addChild(createAxis({ direction: "vertical", count: rows, x: 20, y: 40 }));
  layoutContainer.addChild(createAxis({ direction: "horizontal", count: cols, x: 40, y: 20 }));
  layoutContainer.addChild(beadsContainer);
  viewport.addChild(layoutContainer);
}
