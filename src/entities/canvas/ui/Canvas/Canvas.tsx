import { Stage, type StageProps } from "react-konva";
import { useCanvas } from "../../model/CanvasProvider";

export const Canvas = (props: Omit<StageProps, "ref">) => {
  const { stage } = useCanvas();

  return <Stage ref={stage} {...props}></Stage>;
};
