import { Dialog, Image } from "@/components/misc";
import { Button } from "@/components/ui";
import { formatNumber, Language } from "@/localization";
import { ExpandIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface Expand_Issue_Props {
  issueId: number;
  imageUrl: string;
  note: string;
}

export default function Expand_Issue({ issueId, imageUrl, note }: Expand_Issue_Props) {
  const { i18n, t } = useTranslation();

  return (
    <Dialog
      title={`${t("keyWords.issue")} #${formatNumber(i18n.language as Language, issueId, "decimal")}`}
      description={note}
      toolTip={t("tableActions.expandModal.tooltip.issue")}
      trigger={
        <Button variant="ghost" size="icon" icon={ExpandIcon}>
          {t("tableActions.expandModal.tooltip.issue")}
        </Button>
      }
    >
      <Image src={baseUrl + "StaticFiles/Images/" + imageUrl} className="rounded-lg" alt="issue image" />
    </Dialog>
  );
}
