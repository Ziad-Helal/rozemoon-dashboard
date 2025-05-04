import { AlertDialog } from "@/components/misc";
import { Button } from "@/components/ui";
import { formatNumber, Language } from "@/localization";
import { PackageCheckIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ConfirmScheduledOrderCancelation_Props {
  id: number;
  onConfirm: VoidFunction;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function ConfirmScheduledOrderCancelation({ id, isLoading, disabled, onConfirm }: ConfirmScheduledOrderCancelation_Props) {
  const { i18n, t } = useTranslation();

  return (
    <AlertDialog
      toolTip={t("tableActions.confirmScheduledOrderCancelation.tooltip")}
      message={
        t("tableActions.confirmScheduledOrderCancelation.description.1") +
        formatNumber(i18n.language as Language, id, "decimal") +
        t("tableActions.confirmScheduledOrderCancelation.description.2")
      }
      trigger={
        <Button variant="destructive" size="icon" icon={PackageCheckIcon} isLoading={isLoading} disabled={disabled}>
          {t("tableActions.confirmScheduledOrderCancelation.tooltip")}
        </Button>
      }
      onConfirm={onConfirm}
      submitPhrase={t("forms.confirm")}
    />
  );
}
