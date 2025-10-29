import { BeadCanvas } from "./bead-canvas";
import { Layout } from "./layout";
import { Settings } from "./settings/settings";
import { LootGrid } from "./settings/loop-grid";
import { ChangerMode } from "./settings/changer-mode";

export function BeadPage() {
  return (
    <Layout topLeftSlot={<Settings />} topCenterSlot={<ChangerMode />} topRightSlot={<LootGrid />}>
      <BeadCanvas />
    </Layout>
  );
}
