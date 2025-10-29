import { beadHeight, beadWidth } from "../config/config";
import { useSignal } from "../lib/signals";
import { columns, gridTexture, rows, showMirror } from "../model/store";

interface MirrorGridProps {
  position: "left" | "right";
}

export function MirrorGrid({ position }: MirrorGridProps) {
  const texture = useSignal(gridTexture);
  const rowsCount = useSignal(rows);
  const columnsCount = useSignal(columns);
  const isShowMirror = useSignal(showMirror);

  const gridWidth = columnsCount * beadWidth;
  const gridHeight = rowsCount * beadHeight;

  return (
    <pixiSprite
      texture={texture}
      x={position === "left" ? -gridWidth + beadWidth / 2 : gridWidth}
      width={gridWidth}
      height={gridHeight}
      alpha={isShowMirror ? 0.4 : 0}
    />
  );
}
