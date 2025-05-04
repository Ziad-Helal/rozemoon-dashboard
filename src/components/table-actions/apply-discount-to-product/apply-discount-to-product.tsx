import { Dialog } from "@/components/misc";
import { Button } from "@/components/ui";
import { formatNumber, Language } from "@/localization";
import { PercentIcon } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface ApplyDiscountToProduct_Props {
  id: number;
  children: ReactNode;
  disabled?: boolean;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function ApplyDiscountToProduct({ id, children, disabled, isOpen, setIsOpen }: ApplyDiscountToProduct_Props) {
  const { i18n, t } = useTranslation();

  return (
    <Dialog
      title={t("tableActions.applyDiscount.title")}
      description={t("tableActions.applyDiscount.description") + formatNumber(i18n.language as Language, id, "decimal")}
      toolTip={t("tableActions.applyDiscount.tooltip")}
      trigger={
        <Button size="icon" icon={PercentIcon} disabled={disabled}>
          {t("tableActions.applyDiscount.tooltip")}
        </Button>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      {children}
    </Dialog>
  );
}
