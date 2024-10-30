import { beadSizes } from "../../config/beadSizes";

interface AxisYProps {
  size: number;
}

export const AxisY = (props: AxisYProps) => {
  const { size } = props;
  return (
    <g>
      {[...Array(size).keys()].map((i) => (
        <text
          x={beadSizes.square.width / 2}
          y={i * beadSizes.square.height + beadSizes.square.height / 2 + 25}
          textAnchor="middle"
        >
          {i + 1}
        </text>
      ))}
    </g>
  );
};