import { Viewport, type IViewportOptions } from "pixi-viewport";
import { events } from "../lib/event-emitter";

export class BeadViewport extends Viewport {
  constructor(options: IViewportOptions) {
    super(options);

    this.drag().pinch().wheel();
    this.bindEventEmitters();
  }

  private bindEventEmitters() {
    events.on("changeMode", ({ mode }) => {
      const dragPlugin = this.plugins.get("drag");
      const pinchPlugin = this.plugins.get("pinch");

      if (mode === "drag") {
        dragPlugin?.resume();
        pinchPlugin?.resume();
      } else {
        dragPlugin?.pause();
        pinchPlugin?.pause();
      }
    });
  }
}
