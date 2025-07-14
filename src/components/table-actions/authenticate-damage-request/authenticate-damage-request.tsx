import { AlertDialog } from "@/components/misc";
import { Button } from "@/components/ui";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface AuthenticateDamageRequest_Props {
  action: "approve" | "reject";
  isLoading: boolean;
  disabled: boolean;
  onConfirm: VoidFunction;
}

export default function AuthenticateDamageRequest({ action, isLoading, disabled, onConfirm }: AuthenticateDamageRequest_Props) {
  const { t } = useTranslation();

  return (
    <AlertDialog
      toolTip={t(`keyWords.${action}`)}
      message={t("tableActions.authenticateDamageRequest.description.1") + t(`keyWords.${action}`) + t("tableActions.authenticateDamageRequest.description.2")}
      trigger={
        <Button
          variant={action == "approve" ? "default" : "destructive"}
          size="icon"
          icon={action == "approve" ? ThumbsUpIcon : ThumbsDownIcon}
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
