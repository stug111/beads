import Konva from "konva";
import { Group, Layer, Rect, Stage } from "react-konva";
import { useCanvas } from "@/entities/canvas";
import { selectTool, Tool } from "@/entities/tools";
import { beadSizes } from "@/shared/config";
import { useWindowSize } from "@/shared/hooks";
import { getPatternKey } from "@/shared/lib";
import { useAppSelector } from "@/shared/model";
import type { Pattern } from "@/shared/types";
import { axisXHeight, axisYWidth } from "../../config/elementSize";
import { useZoomStage } from "../../lib/useZoomStage";
import { AxisX } from "../AxisX/AxisX";
import { AxisY } from "../AxisY/AxisY";
import { BeadSquare } from "../BeadSquare/BeadSquare";
import { Rule } from "../Rule/Rule";
import * as styles from "./BeadStage.css";

interface BeadStageProps {
  rows: number;
  columns: number;
  colorClick: string;
  pattern: Record<string, Pattern>;
}

Konva.hitOnDragEnabled = true;

export const BeadStage = (props: BeadStageProps) => {
  const { width, height } = useWindowSize();
  const { stage, beadPattern } = useCanvas();
  const { handelTouchend, handleTouchMove, handleWheel } = useZoomStage();
  const tool = useAppSelector(selectTool);
  const { rows, columns, colorClick, pattern } = props;
  const viewBoxHeight =
    beadSizes.square.height * rows + axisXHeight + axisXHeight;
  const viewBoxWidth =
    beadSizes.square.width * columns + beadSizes.square.width / 2 + axisYWidth;

  return (
    <Stage
      ref={stage}
      height={height}
      width={width}
      className={styles.root}
      draggable={tool === Tool.drag}
      onTouchMove={handleTouchMove}
      onTouchEnd={handelTouchend}
      onWheel={handleWheel}
    >
      <Layer>
        <Group x={width / 2} y={height / 2}>
          <Group x={-viewBoxWidth / 2} y={-viewBoxHeight / 2}>
            <Group ref={beadPattern}>
              {/* Background */}
              <Rect
                y={0}
                x={0}
                width={viewBoxWidth}
                height={viewBoxHeight}
                fill={"#ffffff"}
              />
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
            </Group>

            <Group x={axisYWidth}>
              <Rule viewBoxHeight={viewBoxHeight} viewBoxWidth={viewBoxWidth} />
            </Group>
          </Group>
        </Group>
      </Layer>
    </Stage>
  );
};
