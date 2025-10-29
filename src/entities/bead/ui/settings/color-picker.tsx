import type { ChangeEvent } from "react";
import { changeColor } from "../../model/store";

export function ColorPicker() {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeColor(e.target.value);
  };

  return (
    <input type="color" className=" bg-white border border-gray-300 rounded cursor-pointer" onChange={handleChange} />
  );
}
