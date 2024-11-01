import { Group, Text } from "react-konva";
import { beadSizes } from "@/shared/config";

interface AxisXProps {
  size: number;
}

export const AxisX = (props: AxisXProps) => {
  const { size } = props;
  return (
    <Group>
      {[...Array(size).keys()].map((i) => (
        <Text
          key={`axis-x-${i}`}
          x={i * beadSizes.square.width}
          y={beadSizes.square.height / 2}
          text={`${i + 1}`}
          width={beadSizes.square.width}
          align="center"
          fontSize={14}
        />
      ))}
    </Group>
  );
};
