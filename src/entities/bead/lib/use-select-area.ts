import { useApplication } from "@pixi/react";
import { Bounds, Graphics } from "pixi.js";
import { useEffect, useRef } from "react";
import { cells, mode, setSelectedCells } from "../model/store";
import type { BeadCellId } from "./bead-cell-id";

function checkIntersection(
  beadBounds: Bounds,
  selectionBounds: { x: number; y: number; width: number; height: number }
): boolean {
  return !(
    beadBounds.x + beadBounds.width < selectionBounds.x ||
    beadBounds.x > selectionBounds.x + selectionBounds.width ||
    beadBounds.y + beadBounds.height < selectionBounds.y ||
    beadBounds.y > selectionBounds.y + selectionBounds.height
  );
}

export function useSelectArea() {
  const isTapped = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const selectionGraphics = useRef<Graphics | null>(null);

  const { app } = useApplication();

  useEffect(() => {
    app.stage.on("pointerdown", (event) => {
      if (mode() !== "select") return;

      isTapped.current = true;
      const pos = event.getLocalPosition(app.stage);
      startPos.current = { x: pos.x, y: pos.y };

      if (!selectionGraphics.current) {
        selectionGraphics.current = new Graphics();
        app.stage.addChild(selectionGraphics.current);
      }
    });

    app.stage.on("pointermove", (event) => {
      if (!isTapped.current || !selectionGraphics.current || mode() !== "select") return;

      const pos = event.getLocalPosition(app.stage);
      const graphics = selectionGraphics.current;

      graphics.clear();

      const x = Math.min(startPos.current.x, pos.x);
      const y = Math.min(startPos.current.y, pos.y);
      const width = Math.abs(pos.x - startPos.current.x);
      const height = Math.abs(pos.y - startPos.current.y);

      graphics.rect(x, y, width, height);
      graphics.fill({ color: 0x0000ff, alpha: 0.2 });
      graphics.stroke({ color: 0x0000ff, width: 2, alpha: 0.8 });

      const selectionBounds = { x, y, width, height };
      const selectedIds = new Set<BeadCellId>();
      const allCells = cells();

      allCells.forEach((sprite, cellId) => {
        const beadBounds = sprite.getBounds();

        if (checkIntersection(beadBounds, selectionBounds)) {
          selectedIds.add(cellId);
        }
      });

      setSelectedCells(selectedIds);
    });

    app.stage.on("pointerup", () => {
      isTapped.current = false;

      if (selectionGraphics.current) {
        selectionGraphics.current.clear();
        app.stage.removeChild(selectionGraphics.current);
        selectionGraphics.current = null;
      }
    });

    return () => {
      if (selectionGraphics.current) {
        app.stage.removeChild(selectionGraphics.current);
        selectionGraphics.current = null;
      }
    };
  }, [app.stage]);
}
