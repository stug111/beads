import { Radio, RadioGroup } from "@headlessui/react";
import {
  selectSavedList,
  selectSelectedColor,
  updateSelectedColor,
} from "@/entities/palette";
import { useAppDispatch, useAppSelector } from "@/shared/model";
import * as styles from "./SavedColorList.css";

export const SavedColorList = () => {
  const dispatch = useAppDispatch();
  const colorsList = useAppSelector(selectSavedList);
  const currentColor = useAppSelector(selectSelectedColor);

  const handleClick = (color: string) => {
    dispatch(updateSelectedColor(color));
  };

  return (
    <RadioGroup
      className={styles.root}
      value={currentColor}
      onChange={handleClick}
    >
      {colorsList.map((color) => (
        <Radio
          key={color}
          value={color}
          className={styles.item}
          style={{ backgroundColor: color }}
        />
      ))}
    </RadioGroup>
  );
};
