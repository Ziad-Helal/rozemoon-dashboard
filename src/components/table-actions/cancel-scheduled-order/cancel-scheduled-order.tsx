import { Dialog } from "@/components/misc";
import { Button } from "@/components/ui";
import { formatNumber, Language } from "@/localization";
import { XSquareIcon } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface CancelScheduledOrder_Props {
  id: number;
  children: ReactNode;
  disabled?: boolean;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function CancelScheduledOrder({ id, children, disabled, isOpen, setIsOpen }: CancelScheduledOrder_Props) {
  const { i18n, t } = useTranslation();

  return (
    <Dialog
      title={t("tableActions.cancelScheduledOrder.title")}
      description={t("tableActions.cancelScheduledOrder.description") + formatNumber(i18n.language as Language, id, "decimal")}
      toolTip={t("tableActions.cancelScheduledOrder.tooltip")}
      trigger={
        <Button variant="destructive" size="icon" icon={XSquareIcon} disabled={disabled}>
          {t("tableActions.cancelScheduledOrder.tooltip")}
        </Button>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      {children}
    </Dialog>
  );
}
