import { Dialog } from "@/components/misc";
import { Button } from "@/components/ui";
import { formatNumber, Language } from "@/localization";
import { PercentIcon } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface ChangeDiscountOfProduct_Props {
  id: number;
  children: ReactNode;
  disabled?: boolean;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function ChangeDiscountOfProduct({ id, children, disabled, isOpen, setIsOpen }: ChangeDiscountOfProduct_Props) {
  const { i18n, t } = useTranslation();

  return (
    <Dialog
      title={t("tableActions.changeProductDiscount.title")}
      description={t("tableActions.changeProductDiscount.description") + formatNumber(i18n.language as Language, id, "decimal")}
      toolTip={t("tableActions.changeProductDiscount.tooltip")}
      trigger={
        <Button variant="secondary" size="icon" icon={PercentIcon} disabled={disabled}>
          {t("tableActions.changeProductDiscount.tooltip")}
        </Button>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      {children}
    </Dialog>
  );
}
