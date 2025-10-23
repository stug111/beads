import { events } from "../engine/event-emmiter";

export function ColorPicker() {
  const handleClick = () => {
    events.emit("colorChange", "red");
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="absolute bottom-0 left-0 m-4 p-2 bg-white border border-gray-300 rounded cursor-pointer"
    >
      Color Picker
    </button>
  );
}
