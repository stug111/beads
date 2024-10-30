import { updatePattern } from "@/entities/pattern";
import { useAppDispatch } from "@/shared/model";
import { beadSizes } from "../../config/beadSizes";

interface BeadSquare {
  row: number;
  column: number;
  colorClick: string;
  odd?: boolean;
  patternColor?: string;
}

const width = beadSizes.square.width;
const height = beadSizes.square.height;

export const BeadSquare = (props: BeadSquare) => {
  const { row, column, odd, colorClick, patternColor = "transparent" } = props;
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
    <rect
      x={odd ? column * width + width / 2 : column * width}
      y={row * height}
      width={width}
      height={height}
      rx="5"
      stroke="#000"
      fill={patternColor}
      onClick={handleClick}
    />
  );
};
