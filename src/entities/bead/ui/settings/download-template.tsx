import { Button } from "@radix-ui/themes";
import { application, gridTexture } from "../../model/store";

export function DownloadTemplate() {
  const handleDownload = async () => {
    const app = application();
    const image = await app?.renderer.extract.image(gridTexture());

    const link = document.createElement("a");
    link.href = image?.src || "";
    link.download = "pattern";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button type="button" size="3" onClick={handleDownload}>
      Скачать шаблон
    </Button>
  );
}
