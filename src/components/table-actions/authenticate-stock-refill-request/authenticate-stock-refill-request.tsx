import { AlertDialog } from "@/components/misc";
import { Button } from "@/components/ui";
import { PackageCheckIcon, PackageXIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface AuthenticateStockRefillRequest_Props {
  action: "approve" | "reject";
  isLoading: boolean;
  disabled: boolean;
  onConfirm: VoidFunction;
}

export default function AuthenticateStockRefillRequest({ action, isLoading, disabled, onConfirm }: AuthenticateStockRefillRequest_Props) {
  const { t } = useTranslation();

  return (
    <AlertDialog
      toolTip={t(`keyWords.${action}`)}
      message={t("tableActions.authenticateStockRefillRequest.description.1") + t(`keyWords.${action}`) + t("tableActions.authenticateStockRefillRequest.description.2")}
      trigger={
        <Button
          variant={action == "approve" ? "default" : "destructive"}
          size="icon"
          icon={action == "approve" ? PackageCheckIcon : PackageXIcon}
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
