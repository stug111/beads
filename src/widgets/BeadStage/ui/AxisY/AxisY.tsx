import { Group, Text } from "react-konva";
import { beadSizes } from "@/shared/config";

interface AxisYProps {
  size: number;
}

export const AxisY = (props: AxisYProps) => {
  const { size } = props;

  return (
    <Group>
      {[...Array(size).keys()].map((i) => (
        <Text
          key={`axis-y-${i}`}
          x={0}
          y={i * beadSizes.square.height}
          verticalAlign="middle"
          height={beadSizes.square.height}
          text={`${i + 1}`}
          fontSize={14}
        />
      ))}
    </Group>
  );
};
