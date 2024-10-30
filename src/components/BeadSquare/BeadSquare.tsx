import { useState } from "react";
import { beadSizes } from "../../config/beadSizes";

interface BeadSquare {
  row: number;
  column: number;
  colorClick: string;
  odd?: boolean;
}

const width = beadSizes.square.width;
const height = beadSizes.square.height;

export const BeadSquare = (props: BeadSquare) => {
  const [color, setColor] = useState("transparent");
  const { row, column, odd, colorClick } = props;

  const handleClick = () => {
    setColor(colorClick);
  };
  return (
    <rect
      x={odd ? column * width + width / 2 : column * width}
      y={row * height}
      width={width}
      height={height}
      rx="5"
      stroke="#000"
      fill={color}
      onClick={handleClick}
    />
  );
};
