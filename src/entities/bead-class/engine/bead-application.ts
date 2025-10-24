import { Application, Assets, type ApplicationOptions } from "pixi.js";
import manifest from "../../../manifest.json";
import { BeadGrid } from "./bead-grid";
import { BeadViewport } from "./bead-vieport";

export class BeadApplication extends Application {
  private parent: HTMLElement;

  constructor(parent?: HTMLElement) {
    super();

    this.parent = parent || document.body;
  }
  async init(options: Partial<ApplicationOptions>): Promise<void> {
    options.resizeTo = this.parent;

    await super.init(options);
    this.parent.appendChild(this.canvas);

    await Assets.init({ manifest, basePath: "assets" });
    await Assets.loadBundle("default");
    const allBundles = manifest.bundles.map((item) => item.name);
    // Start up background loading of all bundles
    Assets.backgroundLoadBundle(allBundles);

    this.setup();
  }

  setup(): void {
    const beadGrid = new BeadGrid();
    const viewport = new BeadViewport({ events: this.renderer.events });

    viewport.addChild(beadGrid);

    this.stage.addChild(viewport);
  }
}
