import { Box, Flex } from "@radix-ui/themes";
import { useSignal } from "../../lib/signals";
import { changeColor, color, colorPalette } from "../../model/store";

export function ColorList() {
  const colors = useSignal(colorPalette);
  const activeColor = useSignal(color);

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
          data-active={activeColor === color}
          className="rounded data-[active=true]:ring-2 data-[active=true]:ring-offset-2 data-[active=true]:ring-gray-400 cursor-pointer"
          style={{ backgroundColor: color }}
          onClick={handleColorClick(color)}
        />
      ))}
    </Flex>
  );
}
