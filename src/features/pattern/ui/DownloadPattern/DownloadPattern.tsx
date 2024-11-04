import { useCanvas } from "@/entities/canvas";
import { Button } from "@/shared/ui";

export const DownloadPattern = () => {
  const { beadPattern } = useCanvas();

  const handleDownload = () => {
    const stageRef = beadPattern.current;

    if (stageRef) {
      const url = stageRef.toDataURL();

      const link = document.createElement("a");
      link.href = url;
      link.download = "pattern";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Button type="button" size="l" onClick={handleDownload}>
      Скачать шаблон
    </Button>
  );
};
