import { BeadCanvas } from "./bead-canvas";
import { Layout } from "./layout";
import { Settings } from "./settings";
import { ChangerMode } from "./changer-mode";

export function BeadPage() {
  return (
    <Layout topLeftSlot={<Settings />} topCenterSlot={<ChangerMode />}>
      <BeadCanvas />
    </Layout>
  );
}
