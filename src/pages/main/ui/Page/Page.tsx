import { useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { ChangeSize } from "@/features/settings";
import { selectSize } from "@/entities/settings";
import { useAppSelector } from "@/shared/model";
import { BeadsSvg } from "@/components/BeadsSvg/BeadsSvg";

export const MainPage = () => {
  const svg = useRef<SVGSVGElement>(null);
  const [color, setColor] = useState("#000000");
  const size = useAppSelector(selectSize);

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
      <ChangeSize type="rows" />
      <ChangeSize type="columns" />
      <HexColorPicker color={color} onChange={setColor} />
      <button type="button" onClick={handleDownload}>
        Download
      </button>
      <div>
        <BeadsSvg
          ref={svg}
          row={size.rows}
          column={size.columns}
          colorClick={color}
        />
      </div>
    </div>
  );
};
