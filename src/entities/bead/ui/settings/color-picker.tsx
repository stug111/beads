import type { ChangeEvent } from "react";
import { changeColor, color } from "../../model/store";
import { useSignal } from "../../lib/signals";

export function ColorPicker() {
  const activeColor = useSignal(color);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeColor(e.target.value);
  };

  return (
    <input
      type="color"
      value={activeColor}
      className=" bg-white border border-gray-300 rounded cursor-pointer"
      onChange={handleChange}
    />
  );
}
