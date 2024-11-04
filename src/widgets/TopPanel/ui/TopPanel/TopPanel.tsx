import { DownloadPattern } from "@/features/pattern";
import { ToolBar } from "@/features/tools";
import * as styles from "./TopPanel.css";

export const TopPanel = () => {
  return (
    <div className={styles.root}>
      <div></div>
      <div className={styles.center}>
        <ToolBar />
      </div>
      <div className={styles.right}>
        <DownloadPattern />
      </div>
    </div>
  );
};
