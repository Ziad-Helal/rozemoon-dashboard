import { Dialog } from "@/components/misc";
import { Button } from "@/components/ui";
import { formatNumber, Language } from "@/localization";
import { ClipboardEditIcon } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface UpdateFastOrder_Status_Props {
  id: number;
  children: ReactNode;
  disabled?: boolean;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateFastOrder_Status({ id, children, disabled, isOpen, setIsOpen }: UpdateFastOrder_Status_Props) {
  const { i18n, t } = useTranslation();

  return (
    <Dialog
      title={t("tableActions.updateFastOrderStatus.title")}
      description={t("tableActions.updateFastOrderStatus.description") + formatNumber(i18n.language as Language, id, "decimal")}
      toolTip={t("tableActions.updateFastOrderStatus.tooltip")}
      trigger={
        <Button variant="outline" size="icon" icon={ClipboardEditIcon} disabled={disabled}>
          {t("tableActions.updateFastOrderStatus.tooltip")}
        </Button>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      {children}
    </Dialog>
  );
}
