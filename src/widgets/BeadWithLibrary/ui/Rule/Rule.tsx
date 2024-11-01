import type { Group as GroupInstance } from "konva/lib/Group";
import type { Node } from "konva/lib/Node";
import type { Vector2d } from "konva/lib/types";
import { useRef } from "react";
import { Circle, Group, Line } from "react-konva";

interface RuleProps {
  viewBoxHeight: number;
  viewBoxWidth: number;
}

export const Rule = (props: RuleProps) => {
  const refGroup = useRef<GroupInstance>(null);
  const { viewBoxHeight } = props;

  function handleDragBoundFunc(this: Node, pos: Vector2d): Vector2d {
    return {
      x: pos.x,
      y: this.absolutePosition().y,
    };
  }

  // TODO: add bound by left and right and maybe added move rule by grid
  const handleTouchMove = () => {
    const group = refGroup.current;

    if (group) {
      // group.y(Math.max(group.y(), viewBoxWidth));
    }
  };

  return (
    <Group
      ref={refGroup}
      draggable
      dragBoundFunc={handleDragBoundFunc}
      onTouchMove={handleTouchMove}
    >
      <Line
        points={[0, 0, 0, viewBoxHeight]}
        width={20}
        stroke={"red"}
        strokeWidth={4}
        opacity={0.6}
      />
      <Circle radius={16} fill={"#DADADA"} />
      <Circle radius={16} y={viewBoxHeight - 16} fill={"#DADADA"} />
    </Group>
  );
};
