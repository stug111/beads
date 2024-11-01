import type { Stage as StageInstance } from "konva/lib/Stage";
import { useEffect, useRef } from "react";
import { Group, Layer, Stage } from "react-konva";
import { beadSizes } from "@/shared/config";
import { useWindowSize } from "@/shared/hooks";
import { getPatternKey } from "@/shared/lib";
import type { Pattern } from "@/shared/types";
import { axisXHeight, axisYWidth } from "../../config/elementSize";
import { AxisX } from "../AxisX/AxisX";
import { AxisY } from "../AxisY/AxisY";
import { BeadSquare } from "../BeadSquare/BeadSquare";
import { Rule } from "../Rule/Rule";

interface BeadStageProps {
  rows: number;
  columns: number;
  colorClick: string;
  pattern: Record<string, Pattern>;
}

export const BeadStage = (props: BeadStageProps) => {
  const refStage = useRef<StageInstance>(null);
  const { width } = useWindowSize();
  const { rows, columns, colorClick, pattern } = props;
  const viewBoxHeight =
    beadSizes.square.height * rows + axisXHeight + axisXHeight;
  const viewBoxWidth =
    beadSizes.square.width * columns + beadSizes.square.width / 2 + axisYWidth;

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
        <Group x={viewBoxWidth / 2}>
          <Group x={-viewBoxWidth / 2}>
            <Group y={axisXHeight} x={axisYWidth}>
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
            </Group>
            <Group x={axisYWidth}>
              <AxisX size={columns} />
            </Group>
            <Group
              y={viewBoxHeight - axisXHeight}
              x={axisYWidth + beadSizes.square.width / 2}
            >
              <AxisX size={columns} />
            </Group>
            <Group y={axisXHeight}>
              <AxisY size={rows} />
            </Group>
            <Group x={axisYWidth}>
              <Rule
                refStage={refStage}
                viewBoxHeight={viewBoxHeight}
                viewBoxWidth={viewBoxWidth}
              />
            </Group>
          </Group>
        </Group>
      </Layer>
    </Stage>
  );
};
