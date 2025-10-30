import type { ChangeEvent } from "react";
import { color } from "../../model/store";
import { useSignal } from "../../../../shared/lib";

export function ColorPicker() {
  const activeColor = useSignal(color);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    color.set(e.target.value);
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
