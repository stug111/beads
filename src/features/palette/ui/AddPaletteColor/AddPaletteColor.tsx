import { saveColor, selectSelectedColor } from "@/entities/palette";
import { useAppDispatch, useAppSelector } from "@/shared/model";

export const AddPaletteColor = () => {
  const dispatch = useAppDispatch();
  const color = useAppSelector(selectSelectedColor);

  const handleClick = () => {
    dispatch(saveColor(color));
  };

  return (
    <button type="button" onClick={handleClick}>
      Save color to palette
    </button>
  );
};
