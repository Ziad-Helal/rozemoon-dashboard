import { UpdateUserStatus_Form } from "@/components/forms";
import { Dialog } from "@/components/misc";
import { Button } from "@/components/ui";
import { formatNumber, Language } from "@/localization";
import { UserStatus } from "@/types/api-types";
import { FileEditIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ChangeUserStatus_Props {
  id: number;
  status: UserStatus;
  disabled?: boolean;
}

export default function ChangeUserStatus({ id, status, disabled }: ChangeUserStatus_Props) {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      title={t("tableActions.changeUserStatus.title")}
      description={t("tableActions.changeUserStatus.description") + formatNumber(i18n.language as Language, id, "decimal")}
      toolTip={t("tableActions.changeUserStatus.tooltip")}
      trigger={
        <Button variant="secondary" size="icon" icon={FileEditIcon} disabled={disabled}>
          {t("tableActions.changeUserStatus.tooltip")}
        </Button>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <UpdateUserStatus_Form userId={id} status={status} onSuccess={() => setIsOpen(false)} />
    </Dialog>
  );
}
