import { BeadCanvas } from "./bead-canvas";
import { Layout } from "./layout";
import { Settings } from "./settings/settings";
import { LoopGrid } from "./settings/loop-grid";
import { ChangerMode } from "./settings/changer-mode";
import { Flex } from "@radix-ui/themes";
import { DownloadTemplate } from "./settings/download-template";

export function BeadPage() {
  return (
    <Layout
      topLeftSlot={
        <Flex gap="2" direction="column">
          <Settings />
          <LoopGrid />
        </Flex>
      }
      topCenterSlot={<ChangerMode />}
      topRightSlot={<DownloadTemplate />}
    >
      <BeadCanvas />
    </Layout>
  );
}
