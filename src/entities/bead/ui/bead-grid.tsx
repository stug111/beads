import { Container, FederatedPointerEvent, Point, Texture } from "pixi.js";
import { useCallback, useEffect, useRef } from "react";
import { createBeadCellId, type BeadCellId } from "../lib/bead-cell-id";
import { beadHeight, beadWidth } from "../config/config";
import {
  addCell,
  addToTemplate,
  cells,
  color,
  columns,
  gridTexture,
  isClearPalette,
  isNewPalette,
  mode,
  removeCell,
  removeFromTemplate,
  rows,
  template,
} from "../model/store";
import { useApplication } from "@pixi/react";
import { BeadSelectionHighlight } from "./bead-selection-highlight";
import { useSignal } from "../../../shared/lib";

function getCellFromPointer(point: Point, cols: number, rows: number): { x: number; y: number } | null {
  const row = Math.floor(point.y / beadHeight);
  const rowOffset = row % 2 === 1 ? beadWidth / 2 : 0;
  const col = Math.floor((point.x - rowOffset) / beadWidth);

  if (col < 0 || col >= cols || row < 0 || row >= rows) {
    return null;
  }

  return { x: row, y: col };
}

export function BeadGrid() {
  const currentRows = useSignal(rows);
  const currentColumns = useSignal(columns);
  const { app } = useApplication();

  const ref = useRef<Container>(null);
  const isDrawing = useRef(false);
  const pendingUpdate = useRef<number | null>(null);

  const updateRenderTexture = useCallback(() => {
    if (!ref.current) return;

    const texture = app.renderer.generateTexture({
      target: ref.current,
    });

    gridTexture.set(texture);
  }, [app.renderer]);

  const scheduleTextureUpdate = useCallback(() => {
    if (pendingUpdate.current) return;

    pendingUpdate.current = requestAnimationFrame(() => {
      updateRenderTexture();
      pendingUpdate.current = null;
    });
  }, [updateRenderTexture]);

  const handleDraw = (point: Point) => {
    const cell = getCellFromPointer(point, currentColumns, currentRows);
    if (cell === null) return;

    const bead = cells().get(createBeadCellId(cell.x, cell.y));
    if (!bead) return;

    const currentColor = color();

    if (mode() === "erase") {
      removeFromTemplate(cell.x, cell.y);
      bead.tint = "#ffffff";
    } else {
      addToTemplate(currentColor, cell.x, cell.y);
      bead.tint = currentColor;
    }

    scheduleTextureUpdate();
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

  useEffect(() => {
    updateRenderTexture();
  }, [updateRenderTexture]);

  useEffect(() => {
    return () => {
      if (pendingUpdate.current) {
        cancelAnimationFrame(pendingUpdate.current);
        pendingUpdate.current = null;
      }
    };
  }, []);

  useEffect(() => {
    isClearPalette.subscribe((isClear) => {
      if (isClear) {
        cells().forEach((cell) => {
          cell.tint = "#ffffff";
        });
        scheduleTextureUpdate();
        isClearPalette.set(false);
      }
    });
  }, [scheduleTextureUpdate]);

  useEffect(() => {
    isNewPalette.subscribe((isNew) => {
      if (!isNew) return;

      cells().forEach((cell, cellId) => {
        const beadSettings = template().get(cellId);
        cell.tint = beadSettings?.color || "#ffffff";
      });
      isNewPalette.set(false);
    });
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
      {Array.from({ length: currentRows }).map((_, row) => {
        const rowOffset = row % 2 === 1 ? beadWidth / 2 : 0;

        return Array.from({ length: currentColumns }).map((_, col) => {
          const cellId: BeadCellId = createBeadCellId(row, col);
          const beadSettings = template().get(cellId);
          return (
            <pixiSprite
              label="Bead Cell"
              key={cellId}
              x={col * beadWidth + rowOffset}
              y={row * beadHeight}
              texture={Texture.from("bead.png")}
              width={beadWidth}
              height={beadHeight}
              tint={beadSettings?.color || undefined}
              ref={(sprite) => {
                if (sprite) {
                  addCell(cellId, sprite);
                } else {
                  removeCell(cellId);
                }
              }}
            />
          );
        });
      })}
      <BeadSelectionHighlight />
    </pixiContainer>
  );
}
