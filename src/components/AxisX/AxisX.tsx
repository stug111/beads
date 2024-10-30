import { beadSizes } from "../../config/beadSizes";

interface AxisXProps {
  size: number;
}

export const AxisX = (props: AxisXProps) => {
  const { size } = props;
  return (
    <g>
      {[...Array(size).keys()].map((i) => (
        <text
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
