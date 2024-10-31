import { useRef } from "react";
import { Layer, Stage } from "react-konva";
import { beadSizes } from "@/shared/config";
// import { useScale } from "@/shared/hooks";
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
  const stageRef = useRef<HTMLDivElement>(null);
  const { rows, columns, colorClick, pattern } = props;
  //   const scale = useScale(stageRef.current);
  const viewBoxHeight = beadSizes.square.height * rows;

  return (
    <div ref={stageRef}>
      <Stage width={500} height={viewBoxHeight}>
        <Layer>
          {[...Array(rows).keys()].map((_, indexRow) => {
            return [...Array(columns).keys()].map((_, indexColumn) => {
              const isOdd = indexRow % 2 === 1;
              const patternColor =
                pattern[getPatternKey(indexRow, indexColumn)];

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
    </div>
  );
};
