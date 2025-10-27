import { Container, FederatedPointerEvent, Point, Sprite, Texture } from "pixi.js";
import { useRef } from "react";
import { createBeadCellId, type BeadCellId } from "../lib/bead-cell-id";
import { beadHeight, beadWidth, cols, rows } from "../config/config";
import { addToPalette, color, mode, removeFromPalette } from "../model/store";

function getCellFromPointer(point: Point): { x: number; y: number } | null {
  const row = Math.floor(point.y / beadHeight);
  const rowOffset = row % 2 === 1 ? beadWidth / 2 : 0;
  const col = Math.floor((point.x - rowOffset) / beadWidth);

  if (col < 0 || col >= cols || row < 0 || row >= rows) {
    return null;
  }

  return { x: row, y: col };
}

export function BeadGrid() {
  const ref = useRef<Container>(null);
  const cells = useRef<Map<BeadCellId, Sprite>>(new Map());
  const isDrawing = useRef(false);

  const handleDraw = (point: Point) => {
    const cell = getCellFromPointer(point);
    if (cell === null) return;

    const bead = cells.current.get(createBeadCellId(cell.x, cell.y));
    if (!bead) return;

    const currentColor = color();

    if (mode() === "erase") {
      removeFromPalette(cell.x, cell.y);
      bead.tint = "#ffffff";
    } else {
      addToPalette(currentColor, cell.x, cell.y);
      bead.tint = currentColor;
    }
  };

  const handlePointerMove = (e: FederatedPointerEvent) => {
    const refCurrent = ref.current;

    if (!isDrawing.current || !refCurrent) return;

    handleDraw(refCurrent.toLocal(e.global));
  };

  const handlePointerDown = (e: FederatedPointerEvent) => {
    const currentMode = mode();
    if (currentMode !== "draw" && currentMode !== "erase") {
      isDrawing.current = false;
      return;
    }

    isDrawing.current = true;
    const refCurrent = ref.current;

    if (!refCurrent) return;

    handleDraw(refCurrent.toLocal(e.global));
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
  };

  return (
    <pixiContainer
      label="Bead Grid"
      ref={ref}
      eventMode="static"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerUpOutside={handlePointerUp}
    >
      {Array.from({ length: rows }).map((_, row) => {
        const rowOffset = row % 2 === 1 ? beadWidth / 2 : 0;

        return Array.from({ length: cols }).map((_, col) => {
          const cellId: BeadCellId = createBeadCellId(row, col);
          return (
            <pixiSprite
              label="Bead Cell"
              key={cellId}
              x={col * beadWidth + rowOffset}
              y={row * beadHeight}
              texture={Texture.from("bead.png")}
              width={beadWidth}
              height={beadHeight}
              ref={(sprite) => {
                if (sprite) {
                  cells.current.set(cellId, sprite);
                } else {
                  cells.current.delete(cellId);
                }
              }}
            />
          );
        });
      })}
    </pixiContainer>
  );
}
