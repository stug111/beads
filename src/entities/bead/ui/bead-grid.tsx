import { Container, FederatedPointerEvent, Point, Sprite, Texture } from "pixi.js";
import { useRef } from "react";
import { createBeadCellId, type BeadCellId } from "../lib/bead-cell-id";
import { colorStore } from "../model/color-store";
import { beadHeight, beadWidth, cols, rows } from "../config/config";

function getCellIdFromPointer(point: Point): BeadCellId | null {
  const row = Math.floor(point.y / beadHeight);
  const rowOffset = row % 2 === 1 ? beadWidth / 2 : 0;
  const col = Math.floor((point.x - rowOffset) / beadWidth);

  if (col < 0 || col >= cols || row < 0 || row >= rows) {
    return null;
  }

  return createBeadCellId(row, col);
}

export function BeadGrid() {
  const ref = useRef<Container>(null);
  const cells = useRef<Map<BeadCellId, Sprite>>(new Map());
  const isDrawing = useRef(false);

  const handleDraw = (point: Point) => {
    const cellId = getCellIdFromPointer(point);
    if (cellId === null) return;

    const bead = cells.current.get(cellId);

    if (!bead) return;

    bead.tint = colorStore.getColor();
  };

  const handlePointerMove = (e: FederatedPointerEvent) => {
    if (!isDrawing.current) return;
    handleDraw(e.global);
  };

  const handlePointerDown = (e: FederatedPointerEvent) => {
    isDrawing.current = true;
    handleDraw(e.global);
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
