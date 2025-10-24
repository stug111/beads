import { Container, FederatedPointerEvent, Point, Sprite, Texture } from "pixi.js";
import { events } from "../lib/event-emitter";

export type BeadCellId = `${number}:${number}`;

export function createBeadCellId(row: number, col: number): BeadCellId {
  return `${row}:${col}`;
}

export class BeadGrid extends Container {
  private rows = 0;
  private cols = 0;
  private beadWidth = 0;
  private beadHeight = 0;
  private beadCells: Map<BeadCellId, Sprite> = new Map();
  private isDragging = false;
  private color: string = "#000000";

  constructor() {
    super();

    this.setGridSize(10, 30);
    this.setBeadSize(32, 22);
    this.drawGrid();
    this.bindListeners();
    this.bindEventEmitters();
  }

  setGridSize(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
  }

  setBeadSize(width: number, height: number) {
    this.beadWidth = width;
    this.beadHeight = height;
  }

  private drawGrid() {
    for (let row = 0; row < this.rows; row++) {
      const rowOffset = row % 2 === 1 ? this.beadWidth / 2 : 0;

      for (let col = 0; col < this.cols; col++) {
        const sprite = new Sprite({
          texture: Texture.from("bead.png"),
          x: col * this.beadWidth + rowOffset,
          y: row * this.beadHeight,
          width: this.beadWidth,
          height: this.beadHeight,
        });

        this.beadCells.set(createBeadCellId(row, col), sprite);
        this.addChild(sprite);
      }
    }
  }

  private getCellIdFromPoint(point: Point) {
    const row = Math.floor(point.y / this.beadHeight);
    const rowOffset = row % 2 === 1 ? this.beadWidth / 2 : 0;
    const col = Math.floor((point.x - rowOffset) / this.beadWidth);

    if (col < 0 || col >= this.cols || row < 0 || row >= this.rows) {
      return null;
    }

    return createBeadCellId(row, col);
  }

  private onPointerDraw(point: Point) {
    const cellId = this.getCellIdFromPoint(point);
    if (cellId === null) return;

    const bead = this.beadCells.get(cellId);

    if (!bead) return;

    bead.tint = this.color;
  }

  private onPointerDown(e: FederatedPointerEvent) {
    this.isDragging = true;

    this.onPointerDraw(this.toLocal(e.global));
  }

  private onPointerUp() {
    this.isDragging = false;
  }

  private onPointerMove(e: FederatedPointerEvent) {
    if (!this.isDragging) return;

    this.onPointerDraw(this.toLocal(e.global));
  }

  private bindListeners() {
    this.on("pointerdown", this.onPointerDown);
    this.on("pointerup", this.onPointerUp);
    this.on("pointerupoutside", this.onPointerUp);
    this.on("pointermove", this.onPointerMove);
  }

  private bindEventEmitters() {
    events.on("changeColor", (payload) => {
      this.setColor(payload.color);
    });

    events.on("changeMode", (payload) => {
      if (payload.mode === "draw") {
        this.interactive = true;
      } else {
        this.interactive = false;
      }
    });
  }

  private setColor(color: string) {
    this.color = color;
  }
}
