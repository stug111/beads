import { useBeadModel } from "../model/use-bead-model";

export function ColorPicker() {
  const { instance } = useBeadModel();

  const handleClick = () => {
    instance.setActiveColor("red");
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
