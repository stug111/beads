import { IconButton } from "@radix-ui/themes";
import { mode } from "../../model/store";
import { EraserIcon, HandIcon, Pencil2Icon, TransformIcon } from "@radix-ui/react-icons";
import { useSignal } from "../../lib/signals";

export function ChangerMode() {
  const currentMode = useSignal(mode);

  const handleChangeMode = (newMode: "drag" | "draw" | "erase" | "select") => () => {
    mode.set(newMode);
  };

  return (
    <div className="p-2 bg-white border border-gray-300 rounded-xl flex gap-2">
      <IconButton type="button" onClick={handleChangeMode("drag")} highContrast={currentMode === "drag"}>
        <HandIcon />
      </IconButton>
      <IconButton type="button" onClick={handleChangeMode("draw")} highContrast={currentMode === "draw"}>
        <Pencil2Icon />
      </IconButton>
      <IconButton type="button" onClick={handleChangeMode("erase")} highContrast={currentMode === "erase"}>
        <EraserIcon />
      </IconButton>
      <IconButton type="button" onClick={handleChangeMode("select")} highContrast={currentMode === "select"}>
        <TransformIcon />
      </IconButton>
    </div>
  );
}
