import { useRef, useState, type ChangeEvent } from "react";

import "./App.css";
import { BeadsSvg } from "./components/BeadsSvg/BeadsSvg";
import { HexColorPicker } from "react-colorful";

function App() {
  const svg = useRef<SVGSVGElement>(null);
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState({
    countColumns: 30,
    countRows: 20,
  });

  const handleChangeSize =
    (type: keyof typeof size) => (e: ChangeEvent<HTMLInputElement>) => {
      setSize((prev) => ({
        ...prev,
        [type]: Number(e.target.value),
      }));
    };

  const handleDownload = () => {
    const svgRef = svg.current;

    if (svgRef) {
      const svgContent = svg.current.outerHTML;
      console.log(svgContent);
      const imageURL = URL.createObjectURL(
        new Blob([svgContent], { type: "image/svg+xml" })
      );

      const link = document.createElement("a");
      link.href = imageURL;
      link.download = "image file name here";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div>
      <fieldset>
        <label>Кол-во строк</label>
        <input
          value={size.countRows}
          onChange={handleChangeSize("countRows")}
        />
      </fieldset>
      <fieldset>
        <label>Кол-во колонок</label>
        <input
          value={size.countColumns}
          onChange={handleChangeSize("countColumns")}
        />
      </fieldset>
      <HexColorPicker color={color} onChange={setColor} />
      <button type="button" onClick={handleDownload}>
        Download
      </button>
      <div>
        <BeadsSvg
          ref={svg}
          row={size.countRows}
          column={size.countColumns}
          colorClick={color}
        />
      </div>
    </div>
  );
}

export default App;
