import { changeMode, type StoreState } from "../model/store";

export function ChangerMode() {
  const handleChangeMode = (mode: StoreState["mode"]) => () => {
    changeMode(mode);
  };

  return (
    <div className="absolute top-0 right-0 m-4 p-2 bg-white border border-gray-300 rounded cursor-pointer flex gap-2">
      <button
        className="text-gray-700 hover:bg-gray-100 cursor-pointer"
        type="button"
        onClick={handleChangeMode("drag")}
      >
        Drag
      </button>
      <button
        className="text-gray-700 hover:bg-gray-100 cursor-pointer"
        type="button"
        onClick={handleChangeMode("draw")}
      >
        Draw
      </button>
      <button
        className="text-gray-700 hover:bg-gray-100 cursor-pointer"
        type="button"
        onClick={handleChangeMode("erase")}
      >
        Erase
      </button>
    </div>
  );
}
