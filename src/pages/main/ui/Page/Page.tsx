import { BeadStage } from "@/widgets/BeadStage";
import { BottomPanel } from "@/widgets/BottomPanel";
import { LeftPanel } from "@/widgets/LeftPanel";
import { TopPanel } from "@/widgets/TopPanel";
import { selectSelectedColor } from "@/entities/palette";
import { selectPattern, selectSize } from "@/entities/pattern";
import { useAppSelector } from "@/shared/model";
import * as styles from "./Page.css";

export const MainPage = () => {
  const size = useAppSelector(selectSize);
  const color = useAppSelector(selectSelectedColor);
  const pattern = useAppSelector(selectPattern);

  return (
    <div className={styles.root}>
      <BeadStage
        rows={size.rows}
        columns={size.columns}
        colorClick={color}
        pattern={pattern}
      />
      <TopPanel />
      <LeftPanel />
      <BottomPanel />
    </div>
  );
};
