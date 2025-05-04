import { AlertDialog } from "@/components/misc";
import { Button } from "@/components/ui";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface ToggleVisibility_Props {
  action: "hide" | "unhide";
  item: "category" | "color" | "product" | "provider" | "store" | "review";
  isLoading: boolean;
  disabled: boolean;
  onConfirm: VoidFunction;
}

export default function ToggleVisibility({ action, item, isLoading, disabled, onConfirm }: ToggleVisibility_Props) {
  const { t } = useTranslation();

  return (
    <AlertDialog
      toolTip={t(`keyWords.${action}`) + " " + t(`keyWords.${item}`)}
      message={
        t("tableActions.toggle.description.1") + t(`keyWords.${action}`) + t("tableActions.toggle.description.2") + t(`keyWords.${item}`) + t("tableActions.toggle.description.3")
      }
      trigger={
        <Button variant="outline" size="icon" icon={action == "hide" ? EyeIcon : EyeClosedIcon} isLoading={isLoading} disabled={disabled}>
          {t(`keyWords.${action}`) + " " + t(`keyWords.${item}`)}
        </Button>
      }
      onConfirm={onConfirm}
      submitPhrase={t(`keyWords.${action}`)}
    />
  );
}
