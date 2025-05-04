import { Dialog } from "@/components/misc";
import { Button } from "@/components/ui";
import { formatNumber, Language } from "@/localization";
import { PackageCheckIcon } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface AssignOrderToStore_Props {
  id: number;
  children: ReactNode;
  disabled?: boolean;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function AssignOrderToStore({ id, children, disabled, isOpen, setIsOpen }: AssignOrderToStore_Props) {
  const { i18n, t } = useTranslation();

  return (
    <Dialog
      title={t("tableActions.assignOrderToStore.title")}
      description={t("tableActions.assignOrderToStore.description.1") + formatNumber(i18n.language as Language, id, "decimal") + t("tableActions.assignOrderToStore.description.2")}
      toolTip={t("tableActions.assignOrderToStore.tooltip")}
      trigger={
        <Button size="icon" icon={PackageCheckIcon} disabled={disabled}>
          {t("tableActions.assignOrderToStore.tooltip")}
        </Button>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      {children}
    </Dialog>
  );
}
