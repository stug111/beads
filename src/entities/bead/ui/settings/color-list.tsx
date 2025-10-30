import { Box, Flex } from "@radix-ui/themes";
import { color, colorPalette } from "../../model/store";
import { useSignal } from "../../../../shared/lib";

export function ColorList() {
  const colors = useSignal(colorPalette);
  const activeColor = useSignal(color);

  const handleColorClick = (newColor: string) => () => {
    color.set(newColor);
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
