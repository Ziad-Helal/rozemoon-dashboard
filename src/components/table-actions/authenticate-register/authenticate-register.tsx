import { AlertDialog } from "@/components";
import { Button } from "@/components/ui";
import { FileCheckIcon, FileXIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface AuthenticateRegister_Props {
  action: "approve" | "reject";
  isLoading: boolean;
  disabled: boolean;
  onConfirm: VoidFunction;
}

export default function AuthenticateRegister({ action, isLoading, disabled, onConfirm }: AuthenticateRegister_Props) {
  const { t } = useTranslation();

  return (
    <AlertDialog
      toolTip={t(`keyWords.${action}`)}
      message={
        t("tableActions.authenticateRegister.description.1") +
        t(`keyWords.${action}`) +
        t("tableActions.authenticateRegister.description.2") +
        (action == "approve" ? t("tableActions.authenticateRegister.description.3") : t("tableActions.authenticateRegister.description.4"))
      }
      trigger={
        <Button
          variant={action == "approve" ? "default" : "destructive"}
          size="icon"
          icon={action == "approve" ? FileCheckIcon : FileXIcon}
          isLoading={isLoading}
          disabled={disabled}
        >
          {t(`keyWords.${action}`)}
        </Button>
      }
      onConfirm={onConfirm}
      submitPhrase={t(`keyWords.${action}`)}
    />
  );
}
