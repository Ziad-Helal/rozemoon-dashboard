import { AlertDialog } from "@/components/misc";
import { Button } from "@/components/ui";
import { formatNumber, Language } from "@/localization";
import { PercentIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface RemoveDiscountFromProduct_Props {
  productId: number;
  discountId: number;
  onConfirm: VoidFunction;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function RemoveDiscountFromProduct({ productId, discountId, isLoading, disabled, onConfirm }: RemoveDiscountFromProduct_Props) {
  const { i18n, t } = useTranslation();

  return (
    <AlertDialog
      toolTip={t("tableActions.removeProductDiscount.tooltip")}
      message={
        t("tableActions.removeProductDiscount.description.1") +
        formatNumber(i18n.language as Language, discountId, "decimal") +
        t("tableActions.removeProductDiscount.description.2") +
        formatNumber(i18n.language as Language, productId, "decimal") +
        t("tableActions.removeProductDiscount.description.3")
      }
      trigger={
        <Button variant="destructive" size="icon" icon={PercentIcon} isLoading={isLoading} disabled={disabled}>
          {t("tableActions.removeProductDiscount.tooltip")}
        </Button>
      }
      onConfirm={onConfirm}
      submitPhrase={t("keyWords.remove")}
    />
  );
}
