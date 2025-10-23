import { useRef, useState } from "react";
import { ColorPicker } from "./color-picker";
import { Application, extend } from "@pixi/react";
import { BeadGrid } from "./bead-grid";
import { Assets, Container, Text, Sprite } from "pixi.js";
import manifest from "../../../manifest.json";
import { BeadRule } from "./bead-rule";
import { Axis } from "./axis";
import { cols, rows } from "../config/config";
import { Viewport as PixiViewport } from "pixi-viewport";
import { Viewport } from "./vewport";
import { ChangerMode } from "./changer-mode";

extend({ Container, Sprite, Text, Viewport: PixiViewport });

export function BeadCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  const [initialized, setInitialized] = useState(false);

  const handleInitApp = async () => {
    await Assets.init({ manifest, basePath: "assets" });
    await Assets.loadBundle("default");
    const allBundles = manifest.bundles.map((item) => item.name);
    // Start up background loading of all bundles
    Assets.backgroundLoadBundle(allBundles);
    setInitialized(true);
  };

  return (
    <div ref={ref} className="w-full min-h-dvh overflow-hidden">
      <Application resizeTo={ref} background="#ffffff" onInit={handleInitApp}>
        {initialized && (
          <Viewport>
            <pixiContainer>
              <Axis direction="horizontal" count={cols} x={40} y={20} />
              <pixiContainer x={40} y={40}>
                <BeadGrid />
                <BeadRule />
              </pixiContainer>
              <Axis direction="vertical" count={rows} x={20} y={40} />
            </pixiContainer>
          </Viewport>
        )}
      </Application>
      <ColorPicker />
      <ChangerMode />
    </div>
  );
}
