import Draggable from "react-draggable";
import { beadSizes } from "@/shared/config";

interface RuleProps {
  viewBoxHeight: number;
  viewBoxWidth: number;
}

export const Rule = (props: RuleProps) => {
  const { viewBoxHeight, viewBoxWidth } = props;

  return (
    <Draggable
      axis="x"
      defaultPosition={{ x: 20, y: 0 }}
      bounds={{ left: 20, right: viewBoxWidth - beadSizes.square.width + 20 }}
      grid={[beadSizes.square.width / 2, 0]}
    >
      <g
        style={{
          zIndex: 1,
          userSelect: "none",
          cursor: "pointer",
        }}
      >
        <line
          onDragStart={console.log}
          x1="20"
          y1={2}
          x2="20"
          strokeWidth={4}
          y2={viewBoxHeight - 2}
          stroke="red"
          strokeOpacity={0.6}
        />
        <circle cx="20" cy="16" r="16" fill="#DADADA" />
        <circle cx="20" cy={viewBoxHeight - 16} r="16" fill="#DADADA" />
      </g>
    </Draggable>
  );
};
