import type { ChangeEvent } from "react";
import { changeColor } from "../model/store";

export function ColorPicker() {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeColor(e.target.value);
  };

  return (
    <div className="absolute bottom-0 left-0 m-4 ">
      <input type="color" className=" bg-white border border-gray-300 rounded cursor-pointer" onChange={handleChange} />
    </div>
  );
}
