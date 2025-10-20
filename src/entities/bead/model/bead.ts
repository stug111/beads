import { Application, Assets, Container, FederatedPointerEvent, Point, Sprite, Texture } from "pixi.js";
import type { BeadCellId, BeadConfig } from "./bead.types";

export class Bead {
  private app: Application;
  private config: BeadConfig = {
    cols: 30,
    rows: 10,
    beadWidth: 32,
    beadHeight: 22,
  };
  private beadTexture?: Texture;
  private gridContainer: Container = new Container();
  private cells: Map<BeadCellId, Sprite> = new Map();
  private activeColor = "#000000";

  constructor(parent: HTMLElement) {
    this.app = new Application();

    this.init(parent);
  }

  public async init(parent: HTMLElement) {
    await this.app.init({
      resizeTo: parent,
      backgroundColor: "#ffffff",
    });

    this.beadTexture = await Assets.load("bead.png");
    this.drawGrid();
    this.bindPointerEvents();

    parent.appendChild(this.app.canvas);
    this.app.stage.addChild(this.gridContainer);
  }

  private drawGrid() {
    if (!this.beadTexture) return;

    for (let row = 0; row < this.config.rows; row++) {
      const rowOffset = row % 2 === 1 ? this.config.beadWidth / 2 : 0;

      for (let col = 0; col < this.config.cols; col++) {
        const id: BeadCellId = `${col}:${row}`;
        const beadSprite = new Sprite(this.beadTexture);
        beadSprite.width = this.config.beadWidth;
        beadSprite.height = this.config.beadHeight;

        beadSprite.x = col * this.config.beadWidth + rowOffset;
        beadSprite.y = row * this.config.beadHeight;

        this.cells.set(id, beadSprite);
        this.gridContainer.addChild(beadSprite);
      }
    }
  }

  private setBeadColor(cellId: BeadCellId, color: string) {
    const beadSprite = this.cells.get(cellId);
    if (beadSprite) {
      beadSprite.tint = color;
    }
  }

  private getCellIdFromPointer(point: Point): BeadCellId | null {
    const row = Math.floor(point.y / this.config.beadHeight);
    const rowOffset = row % 2 === 1 ? this.config.beadWidth / 2 : 0;
    const col = Math.floor((point.x - rowOffset) / this.config.beadWidth);

    if (col < 0 || col >= this.config.cols || row < 0 || row >= this.config.rows) {
      return null;
    }

    return `${col}:${row}`;
  }

  private bindPointerEvents() {
    this.app.stage.eventMode = "static";

    const isLeftMouseButtonPressed = (e: PointerEvent): boolean => {
      return e.buttons === 1;
    };

    const drawCell = (e: FederatedPointerEvent) => {
      const cellId = this.getCellIdFromPointer(e.global);
      if (cellId) {
        this.setBeadColor(cellId, this.activeColor);
      }
    };

    this.app.stage.addEventListener("pointerdown", (e) => {
      if (!isLeftMouseButtonPressed(e)) {
        return;
      }

      drawCell(e);
    });

    this.app.stage.addEventListener("pointermove", (e) => {
      if (!isLeftMouseButtonPressed(e)) {
        return;
      }

      drawCell(e);
    });

    this.app.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  public setActiveColor(color: string) {
    this.activeColor = color;
  }

  public changeBeadConfig(newConfig: Partial<BeadConfig>) {
    this.config = { ...this.config, ...newConfig };
    this.gridContainer.removeChildren();
    this.cells.clear();
    this.drawGrid();
  }
}
