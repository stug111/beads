import { selectSavedList, updateSelectedColor } from "@/entities/palette";
import { useAppDispatch, useAppSelector } from "@/shared/model";
import * as styles from "./SavedColorList.css";

export const SavedColorList = () => {
  const dispatch = useAppDispatch();
  const colorsList = useAppSelector(selectSavedList);

  const handleClick = (color: string) => () => {
    dispatch(updateSelectedColor(color));
  };

  return (
    <div className={styles.root}>
      {colorsList.map((color) => (
        <button
          key={color}
          className={styles.item}
          style={{ backgroundColor: color }}
          onClick={handleClick(color)}
        />
      ))}
    </div>
  );
};
