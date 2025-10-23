import { Application, Assets } from "pixi.js";
import manifest from "../../../manifest.json";

export async function createBeadApplication({ resizeTo }: { resizeTo?: HTMLElement | Window }) {
  const app = new Application();

  await app.init({ backgroundColor: "#ffffff", resizeTo });
  await Assets.init({ manifest, basePath: "assets" });
  await Assets.loadBundle("default");
  const allBundles = manifest.bundles.map((item) => item.name);
  // Start up background loading of all bundles
  Assets.backgroundLoadBundle(allBundles);

  return app;
}

export type BeadApplication = Awaited<ReturnType<typeof createBeadApplication>>;
