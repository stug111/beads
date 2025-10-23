import { Viewport } from "pixi-viewport";
import type { BeadApplication } from "./bead-application";

const WORLD_WIDTH = 1000;
const WORLD_HEIGHT = 1000;
let viewport: Viewport;

export function createViewport(app: BeadApplication) {
  viewport = new Viewport({
    worldWidth: WORLD_WIDTH,
    worldHeight: WORLD_HEIGHT,
    events: app.renderer.events,
  });

  viewport.drag().pinch().wheel();
  app.stage.addChild(viewport);
}

export function getViewport(): Viewport {
  return viewport;
}
