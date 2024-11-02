import { Button } from "@headlessui/react";
import { saveColor, selectSelectedColor } from "@/entities/palette";
import { useAppDispatch, useAppSelector } from "@/shared/model";
import * as styles from "./AddPaletteColor.css";

export const AddPaletteColor = () => {
  const dispatch = useAppDispatch();
  const color = useAppSelector(selectSelectedColor);

  const handleClick = () => {
    dispatch(saveColor(color));
  };

  return (
    <Button type="button" onClick={handleClick} className={styles.root}>
      Сохранить цвет
    </Button>
  );
};
