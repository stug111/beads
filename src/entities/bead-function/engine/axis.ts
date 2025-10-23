import { Container, Text } from "pixi.js";
import { beadHeight, beadWidth } from "../config/config";

export function createAxis({
  direction = "horizontal",
  x = 0,
  y = 0,
  count = 10,
}: {
  direction?: "horizontal" | "vertical";
  x?: number;
  y?: number;
  count?: number;
}) {
  const container = new Container({
    x,
    y,
  });
  const isHorizontal = direction === "horizontal";

  for (let i = 0; i < count; i++) {
    const text = new Text({
      text: String(i + 1),
      x: isHorizontal ? beadWidth * i + beadWidth / 2 : 0,
      y: isHorizontal ? 0 : beadHeight * i + beadHeight / 2,
      style: { fontSize: 16, fill: "#000000" },
    });

    text.anchor.set(0.5);

    container.addChild(text);
  }

  return container;
}
