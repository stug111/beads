import { useSignal } from "../../../shared/lib";
import { beadWidth } from "../config/config";
import { gridTexture, showMirror } from "../model/store";

interface MirrorGridProps {
  position: "left" | "right";
}

export function MirrorGrid({ position }: MirrorGridProps) {
  const texture = useSignal(gridTexture);
  const isShowMirror = useSignal(showMirror);

  return (
    <pixiSprite
      texture={texture}
      x={position === "left" ? -texture.width + beadWidth / 2 : texture.width - beadWidth / 2}
      width={texture.width}
      height={texture.height}
      alpha={isShowMirror ? 0.4 : 0}
    />
  );
}
