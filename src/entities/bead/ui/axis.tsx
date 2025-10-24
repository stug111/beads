import { beadHeight, beadWidth } from "../config/config";

interface AxisProps {
  direction?: "horizontal" | "vertical";
  x?: number;
  y?: number;
  count?: number;
}

export function Axis(props: AxisProps) {
  const { direction = "horizontal", x = 0, y = 0, count = 0 } = props;

  const isHorizontal = direction === "horizontal";

  return (
    <pixiContainer label={`Axis ${isHorizontal ? "Horizontal" : "Vertical"}`} x={x} y={y}>
      {Array.from({ length: count }).map((_, index) => (
        <pixiText
          key={index}
          text={index + 1}
          anchor={0.5}
          x={isHorizontal ? beadWidth * index + beadWidth / 2 : 0}
          y={isHorizontal ? 0 : beadHeight * index + beadHeight / 2}
          style={{ fontSize: 16, fill: "#000000" }}
        />
      ))}
    </pixiContainer>
  );
}
