import { UploadedFiles } from "@/components/advanced-input/components/file-input/components";
import { Dialog, LoadingSpinner } from "@/components/misc";
import { Button } from "@/components/ui";
import { fetchImageAsFile } from "@/lib/utils";
import { Image } from "@/types/api-types";
import { ExpandIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface Expand_ProductImages_Props {
  id: number;
  name: string;
  images: Image[];
}

export default function Expand_ProductImages({ id, name, images }: Expand_ProductImages_Props) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [fetchedImages, setFetchedImages] = useState<File[]>([]);
  const [isFetchingImages, setIsFetchingImages] = useState(false);

  useEffect(() => {
    if (isOpen)
      (async function () {
        setIsFetchingImages(true);
        const files = (await Promise.allSettled(images.map(({ imageUrl }) => fetchImageAsFile(baseUrl + imageUrl)))).map((response) =>
          response.status == "fulfilled" ? response.value : ({ preview: "", name: "CORS.image", size: 0, type: "image" } as File)
        );
        if (files.length) setFetchedImages(files);
        setIsFetchingImages(false);
      })();
  }, [isOpen]);

  return (
    <Dialog
      setIsOpen={setIsOpen}
      className="max-w-4xl"
      title={name}
      description={"#" + id}
      toolTip={t("tableActions.expandModal.tooltip.productImages")}
      trigger={
        <Button variant="ghost" size="icon" icon={ExpandIcon}>
          {t("tableActions.expandModal.tooltip.productImages")}
        </Button>
      }
    >
      {isFetchingImages ? <LoadingSpinner /> : <UploadedFiles files={fetchedImages} />}
    </Dialog>
  );
}
