import { Rect } from "react-konva";
import { removeItemFromPattern, updatePattern } from "@/entities/pattern";
import { selectTool, Tool } from "@/entities/tools";
import { beadSizes } from "@/shared/config";
import { useAppDispatch, useAppSelector } from "@/shared/model";

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
  const tool = useAppSelector(selectTool);

  const handleClick = () => {
    if (tool === Tool.fill && colorClick !== patternColor) {
      dispatch(
        updatePattern({
          x: row,
          y: column,
          color: colorClick,
        })
      );
    } else if (tool === Tool.eraser && patternColor !== "transparent") {
      dispatch(
        removeItemFromPattern({
          x: row,
          y: column,
        })
      );
    }
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
      onTouchMove={handleClick}
      onMouseMove={handleClick}
    />
  );
};
