import { Container, FederatedPointerEvent, Point, Sprite, Texture } from "pixi.js";
import { useEffect, useRef } from "react";
import { createBeadCellId, type BeadCellId } from "../lib/bead-cell-id";
import { beadHeight, beadWidth, cols, rows } from "../config/config";
import { events } from "../lib/event-emitter";
import { getColor, getMode } from "../model/store";

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
  const color = useRef<string>(getColor());

  const handleDraw = (point: Point) => {
    const cellId = getCellIdFromPointer(point);
    if (cellId === null) return;

    const bead = cells.current.get(cellId);

    if (!bead) return;

    bead.tint = color.current;
  };

  const handlePointerMove = (e: FederatedPointerEvent) => {
    const refCurrent = ref.current;

    if (!isDrawing.current || !refCurrent) return;

    handleDraw(refCurrent.toLocal(e.global));
  };

  const handlePointerDown = (e: FederatedPointerEvent) => {
    if (getMode() !== "draw") {
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

  useEffect(() => {
    function onColorChange(payload: { color: string }) {
      color.current = payload.color;
    }

    events.on("changeColor", onColorChange);

    return () => {
      events.off("changeColor", onColorChange);
    };
  }, []);

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
