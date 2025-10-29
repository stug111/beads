import { LoopIcon } from "@radix-ui/react-icons";
import { IconButton, Tooltip } from "@radix-ui/themes";
import { useSignal } from "../../lib/signals";
import { showMirror } from "../../model/store";

export function LoopGrid() {
  const isLoop = useSignal(showMirror);

  const handleClick = () => {
    showMirror.set(!isLoop);
  };

  return (
    <Tooltip content="Включить/выключить зацикливание">
      <IconButton highContrast={isLoop} size="3" onClick={handleClick}>
        <LoopIcon />
      </IconButton>
    </Tooltip>
  );
}
