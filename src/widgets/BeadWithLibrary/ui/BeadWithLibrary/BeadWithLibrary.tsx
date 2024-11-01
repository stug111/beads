import KonvaCore from "konva/lib/Core";
import type { KonvaEventObject } from "konva/lib/Node";
import type { Stage as StageInstance } from "konva/lib/Stage";
import { useEffect, useRef } from "react";
import { Group, Layer, Stage } from "react-konva";
import { beadSizes } from "@/shared/config";
import { useWindowSize } from "@/shared/hooks";
import { getPatternKey } from "@/shared/lib";
import type { Pattern } from "@/shared/types";
import { AxisX } from "../AxisX/AxisX";
import { AxisY } from "../AxisY/AxisY";
import { BeadSquare } from "../BeadSquare/BeadSquare";
import { Rule } from "../Rule/Rule";

KonvaCore.hitOnDragEnabled = true;

interface BeadWithLibraryProps {
  rows: number;
  columns: number;
  colorClick: string;
  pattern: Record<string, Pattern>;
}

const axisXHeight = 30;
const axisYWidth = 20;
const scaleBy = 1.01;
let lastCenter: { x: number; y: number } | null = null;
let lastDist = 0;
let dragStopped = false;

function getDistance(
  p1: { x: number; y: number },
  p2: { x: number; y: number }
) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function getCenter(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}

export const BeadWithLibrary = (props: BeadWithLibraryProps) => {
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

  const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const stage = refStage.current;
    if (stage) {
      const oldScale = stage.scaleX();
      const pointer = stage.getPointerPosition();

      if (pointer) {
        const mousePointTo = {
          x: (pointer.x - stage.x()) / oldScale,
          y: (pointer.y - stage.y()) / oldScale,
        };

        let direction = e.evt.deltaY > 0 ? 1 : -1;

        if (e.evt.ctrlKey) {
          direction = -direction;
        }

        const newScale =
          direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;
        stage.scale({ x: newScale, y: newScale });

        const newPos = {
          x: pointer.x - mousePointTo.x * newScale,
          y: pointer.y - mousePointTo.y * newScale,
        };
        stage.position(newPos);
      }
    }
  };

  const handleTouchMove = (e: KonvaEventObject<TouchEvent>) => {
    e.evt.preventDefault();
    const stage = refStage.current;

    if (stage) {
      const touch1 = e.evt.touches[0];
      const touch2 = e.evt.touches[1];

      // we need to restore dragging, if it was cancelled by multi-touch
      if (touch1 && !touch2 && !stage.isDragging() && dragStopped) {
        stage.startDrag();
        dragStopped = false;
      }

      if (touch1 && touch2) {
        // if the stage was under Konva's drag&drop
        // we need to stop it, and implement our own pan logic with two pointers
        if (stage.isDragging()) {
          dragStopped = true;
          stage.stopDrag();
        }

        const p1 = {
          x: touch1.clientX,
          y: touch1.clientY,
        };
        const p2 = {
          x: touch2.clientX,
          y: touch2.clientY,
        };

        if (!lastCenter) {
          lastCenter = getCenter(p1, p2);
          return;
        }
        const newCenter = getCenter(p1, p2);

        const dist = getDistance(p1, p2);

        if (!lastDist) {
          lastDist = dist;
        }

        // local coordinates of center point
        const pointTo = {
          x: (newCenter.x - stage.x()) / stage.scaleX(),
          y: (newCenter.y - stage.y()) / stage.scaleX(),
        };

        const scale = stage.scaleX() * (dist / lastDist);

        stage.scaleX(scale);
        stage.scaleY(scale);

        // calculate new position of the stage
        const dx = newCenter.x - lastCenter.x;
        const dy = newCenter.y - lastCenter.y;

        const newPos = {
          x: newCenter.x - pointTo.x * scale + dx,
          y: newCenter.y - pointTo.y * scale + dy,
        };

        stage.position(newPos);

        lastDist = dist;
        lastCenter = newCenter;
      }
    }
  };

  const handleTouchEnd = () => {
    lastDist = 0;
    lastCenter = null;
  };

  return (
    <Stage
      ref={refStage}
      width={width}
      height={viewBoxHeight}
      draggable
      onWheel={handleWheel}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
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
              <Rule viewBoxHeight={viewBoxHeight} viewBoxWidth={viewBoxWidth} />
            </Group>
          </Group>
        </Group>
      </Layer>
    </Stage>
  );
};
