// import { useRef } from "react";
import { BeadWithLibrary } from "@/widgets/BeadWithLibrary";
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
// import { BeadsSvg } from "@/components/BeadsSvg/BeadsSvg";

export const MainPage = () => {
  // const svg = useRef<SVGSVGElement>(null);
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
        <BeadWithLibrary
          rows={size.rows}
          columns={size.columns}
          colorClick={color}
          pattern={pattern}
        />
        {/* <BeadTemplate
          rows={size.rows}
          columns={size.columns}
          colorClick={color}
        /> */}
        {/* <BeadsSvg
          ref={svg}
          row={size.rows}
          column={size.columns}
          colorClick={color}
          pattern={pattern}
        /> */}
      </div>
    </div>
  );
};
