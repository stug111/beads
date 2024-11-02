import type { KonvaEventObject } from "konva/lib/Node";
import { useRef } from "react";
import { getCenter } from "./getCenter";
import { getDistance } from "./getDistance";
import type { Position } from "./types";

const scaleBy = 1.01;

export const useZoomStage = () => {
  const dragStopped = useRef(false);
  const lastCenter = useRef<Position | null>(null);
  const lastDist = useRef(0);

  const handleTouchMove = (e: KonvaEventObject<TouchEvent>) => {
    e.target.preventDefault();

    const stage = e.target.getStage();
    const touch1 = e.evt.touches[0];
    const touch2 = e.evt.touches[1];

    if (stage) {
      if (touch1 && !touch2 && !stage.isDragging() && dragStopped.current) {
        stage.startDrag();
        dragStopped.current = false;
      }

      if (touch1 && touch2) {
        if (stage.isDragging()) {
          dragStopped.current = true;
          stage.stopDrag();
        }

        const p1: Position = {
          x: touch1.clientX,
          y: touch1.clientY,
        };
        const p2: Position = {
          x: touch2.clientX,
          y: touch2.clientY,
        };

        if (!lastCenter.current) {
          lastCenter.current = getCenter(p1, p2);
          return;
        }
        const newCenter = getCenter(p1, p2);

        const dist = getDistance(p1, p2);

        if (!lastDist.current) {
          lastDist.current = dist;
        }

        // local coordinates of center point
        const pointTo = {
          x: (newCenter.x - stage.x()) / stage.scaleX(),
          y: (newCenter.y - stage.y()) / stage.scaleX(),
        };

        const scale = stage.scaleX() * (dist / lastDist.current);

        stage.scaleX(scale);
        stage.scaleY(scale);

        // calculate new position of the stage
        const dx = newCenter.x - lastCenter.current.x;
        const dy = newCenter.y - lastCenter.current.y;

        const newPos = {
          x: newCenter.x - pointTo.x * scale + dx,
          y: newCenter.y - pointTo.y * scale + dy,
        };

        stage.position(newPos);

        lastDist.current = dist;
        lastCenter.current = newCenter;
      }
    }
  };

  const handelTouchend = () => {
    lastDist.current = 0;
    lastCenter.current = null;
  };

  const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const stage = e.target.getStage();

    if (stage) {
      const oldScale = stage.scaleX();
      const pointer = stage.getPointerPosition();

      if (pointer) {
        const mousePointTo = {
          x: (pointer.x - stage.x()) / oldScale,
          y: (pointer.y - stage.y()) / oldScale,
        };

        let direction = e.evt.deltaY > 0 ? 1 : -1;

        if (e.evt.ctrlKey) {
          direction = -direction;
        }

        const newScale =
          direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

        stage.scale({ x: newScale, y: newScale });

        const newPos = {
          x: pointer.x - mousePointTo.x * newScale,
          y: pointer.y - mousePointTo.y * newScale,
        };
        stage.position(newPos);
      }
    }
  };

  return {
    handleTouchMove,
    handelTouchend,
    handleWheel,
  };
};
