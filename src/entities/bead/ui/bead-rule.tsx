import { FederatedPointerEvent, Sprite, Texture } from "pixi.js";
import { useRef } from "react";
import { beadHeight, beadWidth, rows } from "../config/config";

export function BeadRule() {
  const spriteRef = useRef<Sprite>(null);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0 });

  const handlePointerDown = (e: FederatedPointerEvent) => {
    if (!spriteRef.current) return;

    isDragging.current = true;
    dragOffset.current = {
      x: e.global.x - spriteRef.current.x,
    };
  };

  const handlePointerMove = (e: FederatedPointerEvent) => {
    if (!isDragging.current || !spriteRef.current) return;

    const sprite = spriteRef.current;
    const step = beadWidth;
    const newX = e.global.x - dragOffset.current.x;

    const snappedX = Math.round(newX / step) * step;

    const minX = sprite.width / 2;
    const maxX = sprite.parent!.width - sprite.width / 2;

    sprite.x = Math.max(minX, Math.min(maxX, snappedX));
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <pixiSprite
      label="Bead Rule"
      ref={spriteRef}
      eventMode="static"
      cursor={isDragging.current ? "grabbing" : "grab"}
      texture={Texture.from("rule.png")}
      x={30}
      width={60}
      height={beadHeight * rows}
      onPointerDown={handlePointerDown}
      onGlobalPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerUpOutside={handlePointerUp}
      anchor={{ x: 0.5, y: 0 }}
    />
  );
}
