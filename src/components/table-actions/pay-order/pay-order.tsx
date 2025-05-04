import { Dialog } from "@/components/misc";
import { Button } from "@/components/ui";
import { formatNumber, Language } from "@/localization";
import { BanknoteIcon } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface PayOrder_Props {
  item: "scheduledOrder";
  id: number;
  children: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function PayOrder({ item, id, children, disabled, isLoading, isOpen, setIsOpen }: PayOrder_Props) {
  const { t, i18n } = useTranslation();

  return (
    <Dialog
      title={t(`tableActions.payOrder.${item}`)}
      description={
        t("tableActions.payOrder.description.1") +
        t(`keyWords.${item}`) +
        t("tableActions.payOrder.description.2") +
        formatNumber(i18n.language as Language, id, "decimal") +
        t("tableActions.payOrder.description.3")
      }
      toolTip={t("keyWords.pay")}
      trigger={
        <Button variant="outline" size="icon" icon={BanknoteIcon} isLoading={isLoading} disabled={disabled}>
          {t("keyWords.pay")}
        </Button>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      {children}
    </Dialog>
  );
}
