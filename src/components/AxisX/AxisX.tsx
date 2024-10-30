import { beadSizes } from "@/shared/config";

interface AxisXProps {
  size: number;
}

export const AxisX = (props: AxisXProps) => {
  const { size } = props;
  return (
    <g>
      {[...Array(size).keys()].map((i) => (
        <text
          key={`axis-x-${i}`}
          x={i * beadSizes.square.width + beadSizes.square.width / 2}
          y={beadSizes.square.height / 2}
          textAnchor="middle"
        >
          {i + 1}
        </text>
      ))}
    </g>
  );
};
