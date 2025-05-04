import { Image, ToolTip } from "@/components/misc";
import { Button } from "@/components/ui";
import { cn, formatBytes } from "@/lib/utils";
import { handleDirectionChange } from "@/localization";
import { FileTextIcon, Trash2Icon } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface File_Card_Props {
  file: File;
  onRemove: () => void;
  disabled?: boolean;
}

export default function File_Card({ file, onRemove, disabled }: File_Card_Props) {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    return () => {
      if (isFileWithPreview(file)) URL.revokeObjectURL(file.preview);
    };
  }, []);

  function isFileWithPreview(file: File): file is File & { preview: string } {
    return "preview" in file && typeof file.preview === "string";
  }

  return (
    <div>
      <div className="relative aspect-square bg-primary/5 rounded-md overflow-hidden">
        {isFileWithPreview(file) && file.type.startsWith("image/") ? (
          <Image src={file.preview} alt={file.name} className="size-full" />
        ) : (
          <FileTextIcon className="size-full text-muted-foreground" aria-hidden="true" />
        )}
        <ToolTip
          content={t("keyWords.remove")}
          trigger={
            <Button
              variant="destructive"
              size="icon"
              icon={Trash2Icon}
              iconClassName="!size-4"
              className={cn("bg-destructive/75 size-7 absolute top-1", handleDirectionChange(i18n.dir(), "right-1", "left-1"))}
              onClick={onRemove}
              disabled={disabled}
            >
              <span className="sr-only">{t("keyWords.remove")}</span>
            </Button>
          }
        />
      </div>
      <div className="flex w-full flex-col gap-2 p-1">
        <div className="flex flex-col gap-px">
          <p className="line-clamp-1 text-sm font-medium text-foreground/80">{file.name}</p>
          <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
        </div>
      </div>
    </div>
  );
}
