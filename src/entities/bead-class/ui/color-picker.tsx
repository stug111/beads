import type { ChangeEvent } from "react";
import { events } from "../lib/event-emitter";

export function ColorPicker() {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    events.emit("changeColor", { color: e.target.value });
  };

  return (
    <div className="absolute bottom-0 left-0 m-4 ">
      <input type="color" className=" bg-white border border-gray-300 rounded cursor-pointer" onChange={handleChange} />
    </div>
  );
}
