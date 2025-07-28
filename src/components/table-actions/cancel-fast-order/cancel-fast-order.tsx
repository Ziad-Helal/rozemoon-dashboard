import { AlertDialog } from "@/components/misc";
import { Button } from "@/components/ui";
import { XIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatNumber, type Language } from "@/localization";

interface CancelFastOrder_Props {
  id: number;
  isLoading: boolean;
  disabled?: boolean;
  onConfirm: VoidFunction;
}

export default function CancelFastOrder({ id, isLoading, disabled, onConfirm }: CancelFastOrder_Props) {
  const { t, i18n } = useTranslation();

  return (
    <AlertDialog
      toolTip={t("tableActions.cancelFastOrder.tooltip")}
      message={t("tableActions.cancelFastOrder.description") + formatNumber(i18n.language as Language, id, "decimal")}
      trigger={
        <Button variant="destructive" size="icon" icon={XIcon} isLoading={isLoading} disabled={disabled}>
          {t("tableActions.cancelFastOrder.tooltip")}
        </Button>
      }
      onConfirm={onConfirm}
    />
  );
}
