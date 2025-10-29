import { TrashIcon } from "@radix-ui/react-icons";
import { IconButton, Tooltip } from "@radix-ui/themes";
import { isClearPalette } from "../../model/store";

export function ClearTemplate() {
  const handleClear = () => {
    const isConfirm = confirm("Очистить цветовую палитру?");

    if (isConfirm) {
      isClearPalette.set(true);
    }
  };

  return (
    <Tooltip content="Очистить палитру">
      <IconButton size="3" onClick={handleClear}>
        <TrashIcon />
      </IconButton>
    </Tooltip>
  );
}
