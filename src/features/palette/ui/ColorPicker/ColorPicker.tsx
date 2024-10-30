import { HexColorPicker } from "react-colorful";
import { useDispatch } from "react-redux";
import { selectSelectedColor, updateSelectedColor } from "@/entities/palette";
import { useAppSelector } from "@/shared/model";

export const ColorPicker = () => {
  const dispatch = useDispatch();
  const color = useAppSelector(selectSelectedColor);

  const handelChangeColor = (color: string) => {
    dispatch(updateSelectedColor(color));
  };

  return <HexColorPicker color={color} onChange={handelChangeColor} />;
};
