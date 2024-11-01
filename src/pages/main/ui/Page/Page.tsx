import { BeadStage } from "@/widgets/BeadStage";
import {
  AddPaletteColor,
  ColorPicker,
  SavedColorList,
} from "@/features/palette";
import { ClearPattern } from "@/features/pattern";
import { ChangeSize } from "@/features/settings";
import { selectSelectedColor } from "@/entities/palette";
import { selectPattern } from "@/entities/pattern";
import { selectSize } from "@/entities/settings";
import { useAppSelector } from "@/shared/model";
import * as styles from "./Page.css";

export const MainPage = () => {
  const size = useAppSelector(selectSize);
  const color = useAppSelector(selectSelectedColor);
  const pattern = useAppSelector(selectPattern);

  return (
    <div>
      <ChangeSize type="rows" />
      <ChangeSize type="columns" />
      <div className={styles.container}>
        <div>
          <ColorPicker />
          <AddPaletteColor />
          <ClearPattern />
        </div>
        <div>
          <SavedColorList />
        </div>
      </div>

      <div>
        <BeadStage
          rows={size.rows}
          columns={size.columns}
          colorClick={color}
          pattern={pattern}
        />
      </div>
    </div>
  );
};
