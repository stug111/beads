import { type Plugin, type ResolvedConfig } from "vite";
import { AssetPack, type AssetPackConfig } from "@assetpack/core";
import { pixiPipes } from "@assetpack/core/pixi";

export function assetpackPlugin(): Plugin {
  const apConfig: AssetPackConfig = {
    entry: "./raw-assets",
    pipes: [
      ...pixiPipes({
        cacheBust: false,
        manifest: {
          output: "./src/manifest.json",
        },
      }),
    ],
  };
  let mode: ResolvedConfig["command"];
  let ap: AssetPack | undefined;

  return {
    name: "vite-plugin-assetpack",
    configResolved(resolvedConfig) {
      mode = resolvedConfig.command;
      if (!resolvedConfig.publicDir) return;
      if (apConfig.output) return;
      // remove the root from the public dir
      const publicDir = resolvedConfig.publicDir.replace(process.cwd(), "");

      if (process.platform === "win32") {
        apConfig.output = `${publicDir}/assets/`;
      } else {
        apConfig.output = `.${publicDir}/assets/`;
      }
    },
    buildStart: async () => {
      if (mode === "serve") {
        if (ap) return;
        ap = new AssetPack(apConfig);
        await ap.watch();
      } else {
        await new AssetPack(apConfig).run();
      }
    },
    buildEnd: async () => {
      if (ap) {
        await ap.stop();
        ap = undefined;
      }
    },
  };
}
