import { Dialog, Image, LoadingSpinner } from "@/components";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { FileTextIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface DownloadDocuments_Props {
  documents: string[];
  isLoading: boolean;
  disabled: boolean;
  onOpen: VoidFunction;
  item?: "invoice" | "documents";
}

export default function DownloadDocuments({ documents, disabled, isLoading, onOpen, item }: DownloadDocuments_Props) {
  const { t } = useTranslation();
  const isMoreThanOneFile = documents.length > 1;

  const toolTip =
    t("tableActions.downloadDocuments.download") +
    (item ? t(`tableActions.downloadDocuments.${item}`, { defaultValue: item || t("tableActions.downloadDocuments.documents") }) : t("tableActions.downloadDocuments.documents"));

  return (
    <Dialog
      title={item ? t(`tableActions.downloadDocuments.${item}`) : t("tableActions.downloadDocuments.documents")}
      description=""
      className={cn("lg:max-w-screen-md", isMoreThanOneFile ? "2xl:max-w-screen-2xl" : "")}
      toolTip={toolTip}
      trigger={
        <Button variant="ghost" size="icon" icon={FileTextIcon} onClick={onOpen} disabled={disabled}>
          {toolTip}
        </Button>
      }
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : documents.length ? (
        <div className={cn("grid gap-3", isMoreThanOneFile ? "2xl:grid-cols-2" : "")}>
          {documents.map((url) => {
            const extension = url.split(".").pop();
            return extension && extension.length > 4 ? (
              <iframe key={url} src={url} title="File Preview" style={{ width: "100%", aspectRatio: 210 / 297 }} />
            ) : (
              <Image key={url} src={url} />
            );
          })}
        </div>
      ) : (
        <p>{t("tableActions.downloadDocuments.empty")}</p>
      )}
    </Dialog>
  );
}
