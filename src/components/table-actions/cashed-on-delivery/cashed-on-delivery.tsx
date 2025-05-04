import { AlertDialog } from "@/components/misc";
import { Button } from "@/components/ui";
import { formatNumber, Language } from "@/localization";
import { BanknoteIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CashedOnDelivery_Props {
  item: "fast order" | "scheduled order";
  id: number;
  isLoading: boolean;
  disabled: boolean;
  onConfirm: VoidFunction;
}

export default function CashedOnDelivery({ item, id, isLoading, disabled, onConfirm }: CashedOnDelivery_Props) {
  const { i18n, t } = useTranslation();

  return (
    <AlertDialog
      toolTip={t("tableActions.cashedOnDelivery.tooltip")}
      message={
        t("tableActions.cashedOnDelivery.description.1") +
        t(`keyWords.${item}`, { defaultValue: item }) +
        t("tableActions.cashedOnDelivery.description.2") +
        formatNumber(i18n.language as Language, id, "decimal") +
        t("tableActions.cashedOnDelivery.description.3")
      }
      trigger={
        <Button size="icon" icon={BanknoteIcon} isLoading={isLoading} disabled={disabled}>
          {t("tableActions.cashedOnDelivery.tooltip")}
        </Button>
      }
      onConfirm={onConfirm}
      submitPhrase={t("forms.confirm")}
    />
  );
}
