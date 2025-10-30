import { Graphics } from "pixi.js";
import { useCallback, useEffect, useRef } from "react";
import { cells, selectedCells } from "../model/store";
import { beadHeight, beadWidth } from "../config/config";
import { useSelectArea } from "../lib/use-select-area";

export function BeadSelectionHighlight() {
  const graphicsRef = useRef<Graphics | null>(null);
  useSelectArea();

  const updateHighlight = useCallback(() => {
    if (!graphicsRef.current) return;

    const graphics = graphicsRef.current;
    graphics.clear();

    const selected = selectedCells();
    const allCells = cells();

    selected.forEach((cellId) => {
      const sprite = allCells.get(cellId);
      if (!sprite) return;

      const bounds = sprite.getBounds();
      const localPos = graphics.parent!.toLocal({ x: bounds.x, y: bounds.y });

      graphics.roundRect(localPos.x, localPos.y, beadWidth, beadHeight, 4);
      graphics.stroke({ color: 0x0000ff, width: 2 });
    });
  }, []);

  useEffect(() => {
    const unsubscribe = selectedCells.subscribe(() => {
      updateHighlight();
    });

    return unsubscribe;
  }, [updateHighlight]);

  return (
    <pixiGraphics
      draw={updateHighlight}
      ref={(graphics) => {
        if (graphics) {
          graphicsRef.current = graphics;
        }
      }}
    />
  );
}
