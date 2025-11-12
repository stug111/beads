import { BeadCanvas } from "./bead-canvas";
import { Layout } from "./layout";
import { Settings } from "./settings/settings";
import { LoopGrid } from "./settings/loop-grid";
import { ChangerMode } from "./settings/changer-mode";
import { Flex } from "@radix-ui/themes";
import { DownloadTemplate } from "./settings/download-template";
import { ClearTemplate } from "./settings/clear-template";
import { SaveTemplate } from "./settings/save-template";
import { TemplatesList } from "./settings/templates-list";

export function BeadPage() {
  return (
    <Layout
      topLeftSlot={
        <Flex gap="2" direction="column">
          <Settings />
          <LoopGrid />
          <ClearTemplate />
        </Flex>
      }
      topCenterSlot={<ChangerMode />}
      topRightSlot={
        <Flex gap="2" direction="column">
          <DownloadTemplate />
          <SaveTemplate />
          <TemplatesList />
        </Flex>
      }
    >
      <BeadCanvas />
    </Layout>
  );
}
