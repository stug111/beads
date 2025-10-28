import { Box, Flex } from "@radix-ui/themes";
import { useSignal } from "../../lib/signals";
import { changeColor, colorPalette } from "../../model/store";

export function ColorList() {
  const colors = useSignal(colorPalette);

  const handleColorClick = (color: string) => () => {
    changeColor(color);
  };

  return (
    <Flex gap="2" wrap="wrap">
      {Array.from(colors).map((color) => (
        <Box
          key={color}
          width="24px"
          height="24px"
          className="rounded"
          style={{ backgroundColor: color }}
          onClick={handleColorClick(color)}
        />
      ))}
    </Flex>
  );
}
