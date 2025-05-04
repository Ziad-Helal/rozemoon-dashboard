import { AlertDialog } from "@/components/misc";
import { Button } from "@/components/ui";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ToggleActiveness_Props {
  action: "activate" | "deactivate";
  item: "discount";
  isLoading: boolean;
  disabled: boolean;
  onConfirm: VoidFunction;
}

export default function ToggleActiveness({ action, item, isLoading, disabled, onConfirm }: ToggleActiveness_Props) {
  const { t } = useTranslation();

  return (
    <AlertDialog
      toolTip={t(`keyWords.${action}`) + " " + t(`keyWords.${item}`)}
      message={
        t("tableActions.toggle.description.1") + t(`keyWords.${action}`) + t("tableActions.toggle.description.2") + t(`keyWords.${item}`) + t("tableActions.toggle.description.3")
      }
      trigger={
        <Button variant="outline" size="icon" icon={action == "deactivate" ? EyeIcon : EyeClosedIcon} isLoading={isLoading} disabled={disabled}>
          {t(`keyWords.${action}`)} {t(`keyWords.${item}`)}
        </Button>
      }
      onConfirm={onConfirm}
      submitPhrase={t(`keyWords.${action}`)}
    />
  );
}
