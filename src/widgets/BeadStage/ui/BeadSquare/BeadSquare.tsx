import { Rect } from "react-konva";
import { updatePattern } from "@/entities/pattern";
import { beadSizes } from "@/shared/config";
import { useAppDispatch } from "@/shared/model";

interface BeadSquareProps {
  row: number;
  column: number;
  colorClick: string;
  odd?: boolean;
  patternColor?: string;
}

const width = beadSizes.square.width;
const height = beadSizes.square.height;

export const BeadSquare = (props: BeadSquareProps) => {
  const { row, column, odd, patternColor = "transparent", colorClick } = props;
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(
      updatePattern({
        x: row,
        y: column,
        color: colorClick,
      })
    );
  };

  return (
    <Rect
      x={odd ? column * width + width / 2 : column * width}
      y={row * height}
      width={width}
      height={height}
      stroke={"#000"}
      strokeWidth={1}
      onClick={handleClick}
      onTap={handleClick}
      fill={patternColor}
      cornerRadius={5}
    />
  );
};
