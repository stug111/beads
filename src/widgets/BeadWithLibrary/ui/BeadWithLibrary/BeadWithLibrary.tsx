import type { Stage as StageInstance } from "konva/lib/Stage";
import { useEffect, useRef } from "react";
import { Layer, Stage } from "react-konva";
import { beadSizes } from "@/shared/config";
import { useWindowSize } from "@/shared/hooks";
import { getPatternKey } from "@/shared/lib";
import type { Pattern } from "@/shared/types";
import { BeadSquare } from "../BeadSquare/BeadSquare";

interface BeadWithLibraryProps {
  rows: number;
  columns: number;
  colorClick: string;
  pattern: Record<string, Pattern>;
}

export const BeadWithLibrary = (props: BeadWithLibraryProps) => {
  const refStage = useRef<StageInstance>(null);
  const { width } = useWindowSize();
  const { rows, columns, colorClick, pattern } = props;
  const viewBoxHeight = beadSizes.square.height * rows;
  const viewBoxWidth =
    beadSizes.square.width * columns + beadSizes.square.width / 2;

  useEffect(() => {
    const refCurrent = refStage.current;

    if (refCurrent) {
      if (width < viewBoxWidth) {
        const scale = width / viewBoxWidth;

        if (scale) {
          refCurrent.scale({ x: scale, y: scale });
        }
      }
    }
  }, [viewBoxWidth, width]);

  return (
    <Stage ref={refStage} width={width} height={viewBoxHeight}>
      <Layer>
        {[...Array(rows).keys()].map((_, indexRow) => {
          return [...Array(columns).keys()].map((_, indexColumn) => {
            const isOdd = indexRow % 2 === 1;
            const patternColor = pattern[getPatternKey(indexRow, indexColumn)];

            return (
              <BeadSquare
                key={`${indexRow}-${indexColumn}`}
                column={indexColumn}
                row={indexRow}
                odd={isOdd}
                colorClick={colorClick}
                patternColor={patternColor?.color}
              />
            );
          });
        })}
      </Layer>
    </Stage>
  );
};
