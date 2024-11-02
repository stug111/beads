import type { Group as GroupInstance } from "konva/lib/Group";
import type { KonvaEventObject, Node } from "konva/lib/Node";
import type { Vector2d } from "konva/lib/types";
import { useRef } from "react";
import { Circle, Group, Line } from "react-konva";
import { beadSizes } from "@/shared/config";
import { axisYWidth } from "../../config/elementSize";

interface RuleProps {
  viewBoxHeight: number;
  viewBoxWidth: number;
}
const circleRadius = 16;

export const Rule = (props: RuleProps) => {
  const { viewBoxHeight, viewBoxWidth } = props;
  const refGroup = useRef<GroupInstance>(null);

  function handleDragBoundFunc(this: Node, pos: Vector2d): Vector2d {
    return {
      x: pos.x,
      y: this.absolutePosition().y,
    };
  }

  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    const group = refGroup.current;

    if (group) {
      const gridByGrid =
        Math.round(e.target.x() / (beadSizes.square.width / 2)) *
        (beadSizes.square.width / 2);
      const x = Math.max(0, Math.min(viewBoxWidth - axisYWidth, gridByGrid));
      group.x(x);
    }
  };

  const handleMouseEnter = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();

    if (stage) {
      stage.container().style.cursor = "pointer";
    }
  };

  const handleMouseLeave = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();

    if (stage) {
      stage.container().style.cursor = "default";
    }
  };

  return (
    <Group
      ref={refGroup}
      draggable
      dragBoundFunc={handleDragBoundFunc}
      onDragMove={handleDragMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Line
        points={[0, 0, 0, viewBoxHeight]}
        width={20}
        stroke="rgb(0, 99, 255)"
        strokeWidth={4}
        opacity={0.6}
      />
      <Circle radius={circleRadius} y={circleRadius} fill={"#DADADA"} />
      <Circle
        radius={circleRadius}
        y={viewBoxHeight - circleRadius}
        fill={"#DADADA"}
      />
    </Group>
  );
};
