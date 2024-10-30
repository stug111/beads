import { forwardRef } from "react";
import { beadSizes } from "@/shared/config";
import { getPatternKey } from "@/shared/lib";
import type { Pattern } from "@/shared/types";
import { AxisX } from "../AxisX/AxisX";
import { AxisY } from "../AxisY/AxisY";
import { BeadSquare } from "../BeadSquare/BeadSquare";

interface BeadsSvg {
  row: number;
  column: number;
  colorClick: string;
  pattern: Record<string, Pattern>;
}

export const BeadsSvg = forwardRef<SVGSVGElement, BeadsSvg>((props, ref) => {
  const { row, column, colorClick, pattern } = props;

  const viewBoxHeight = beadSizes.square.height * row + 20;
  const viewBoxWidth =
    beadSizes.square.width * column + beadSizes.square.width / 2 + 40;

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      height={viewBoxHeight}
      width="100%"
      preserveAspectRatio="xMidYMid"
    >
      <g transform={`translate(40, 20)`}>
        {[...Array(row).keys()].map((_, indexRow) => {
          return [...Array(column).keys()].map((_, indexColumn) => {
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
      </g>
      <g transform={`translate(40, 3)`}>
        <AxisX size={column} />
      </g>
      <AxisY size={row} />
    </svg>
  );
});
