import { Dialog } from "@/components/misc";
import { Button } from "@/components/ui";
import { formatNumber, Language } from "@/localization";
import { PackageXIcon } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface RejectScheduledOrder_Props {
  bookingId: number;
  children: ReactNode;
  disabled?: boolean;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function RejectScheduledOrder({ bookingId, children, disabled, isOpen, setIsOpen }: RejectScheduledOrder_Props) {
  const { i18n, t } = useTranslation();

  return (
    <Dialog
      toolTip={t("tableActions.rejectScheduledOrder.tooltip")}
      title={t("tableActions.rejectScheduledOrder.title")}
      description={t("tableActions.rejectScheduledOrder.description") + formatNumber(i18n.language as Language, bookingId, "decimal")}
      trigger={
        <Button variant="destructive" size="icon" icon={PackageXIcon} disabled={disabled}>
          {t("tableActions.rejectScheduledOrder.tooltip")}
        </Button>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      {children}
    </Dialog>
  );
}
