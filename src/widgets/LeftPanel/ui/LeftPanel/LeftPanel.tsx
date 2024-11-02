import {
  AddPaletteColor,
  ColorPicker,
  SavedColorList,
} from "@/features/palette";
import { ChangeSize } from "@/features/pattern";
import { Section } from "../Section/Section";
import * as styles from "./LeftPanel.css";

export const LeftPanel = () => {
  return (
    <div className={styles.root}>
      <Section>
        <ChangeSize type="rows" label="Кол-во строк" />
        <ChangeSize type="columns" label="Кол-во столбцов" />
      </Section>
      <Section title="Палитра">
        <SavedColorList />
      </Section>
      <Section>
        <ColorPicker />
        <div className={styles.addColorButton}>
          <AddPaletteColor />
        </div>
      </Section>
    </div>
  );
};
