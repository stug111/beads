import type { RefObject } from "react";

interface DownloadPatternProps {
  svgRef: RefObject<SVGSVGElement>;
}

export const DownloadPattern = (props: DownloadPatternProps) => {
  const { svgRef } = props;

  //   TODO: add logic download jpeg not svg
  const handleDownload = () => {
    const svg = svgRef.current;

    if (svg) {
      const svgContent = svg.outerHTML;
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
    <button type="button" onClick={handleDownload}>
      DownloadPattern
    </button>
  );
};
